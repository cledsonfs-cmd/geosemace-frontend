import React, { useState, useRef, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import * as s from "./styles";

import PainelFiltroMapa from "../PainelFiltroMapa";
import CardMapa from "../CardMapa/indes";
import PainelCamadasMapa from "../PainelCamadasMapa";
import PainelDistanciaMapa from "../PainelDistanciaMapa";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  camadasTotalRequest,
  camadaRequest,
} from "@/redux/modules/camada/actions";
import { shapeSearchRequest } from "@/redux/modules/shape/actions";
import { Camada } from "@/redux/modules/camada/interfaces";

const containerStyle = { width: "100%", height: "100%" };
const libraries: ("geometry")[] = ["geometry"];

export default function MapaGoogle() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries,
  });

  const dispatch = useDispatch();
  const { totais: camadasTotais, camada } = useSelector(
    (state: RootState) => state.camada
  );

  const { totalRegistros, shapes } = useSelector(
    (state: RootState) => state.shape
  );

  const mapRef = useRef<google.maps.Map | null>(null);
  const gridLinesRef = useRef<google.maps.Polyline[]>([]);
  const featureMap = useRef<Record<any, google.maps.Data.Feature[]>>({});

  const [mapType, setMapType] = useState<string>("roadmap");
  const [showGrid, setShowGrid] = useState(false);
  const [isBasePanelOpen, setIsBasePanelOpen] = useState(false);
  const [enabledMeasurement, setEnabledMeasurement] = useState(false);
  const [path, setPath] = useState<google.maps.LatLngLiteral[]>([]);
  const [distance, setDistance] = useState<number>(0);
  const [camadasFiltro, setCamadasFiltro] = useState<any[]>([]);
  const [camadas, setCamadas] = useState(0);
  const [tipos, setTipos] = useState(0);
  const [fontes, setFontes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [idShapeSelecionado, setIdShapeSelecionado] = useState<any | null>(
    null
  );

  const [nomeShapeSelecionado, setNomeShapeSelecionado] = useState<number | null>(
    null
  );

  const [geojsonLocal, setGeojsonLocal] = useState<any[]>([]);

  // ==== TOOLTIP AO PASSAR O MOUSE ===========================================
  const [hoverInfo, setHoverInfo] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);


  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: -3.71722,
    lng: -38.5433,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pesquisaFeita, setPesquisaFeita] = useState(false);

  // ==== GRID ======================================================
  const generateGridLines = () => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    gridLinesRef.current.forEach((line) => line.setMap(null));
    gridLinesRef.current = [];

    if (!showGrid) return;

    const bounds = map.getBounds();
    if (!bounds) return;

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const latStep = 0.02;
    const lngStep = 0.02;

    const newLines: google.maps.Polyline[] = [];

    for (let lat = sw.lat(); lat <= ne.lat(); lat += latStep) {
      newLines.push(
        new google.maps.Polyline({
          path: [
            { lat, lng: sw.lng() },
            { lat, lng: ne.lng() },
          ],
          strokeColor: "#999999",
          strokeOpacity: 0.5,
          strokeWeight: 1,
        })
      );
    }

    for (let lng = sw.lng(); lng <= ne.lng(); lng += lngStep) {
      newLines.push(
        new google.maps.Polyline({
          path: [
            { lat: sw.lat(), lng },
            { lat: ne.lat(), lng },
          ],
          strokeColor: "#999999",
          strokeOpacity: 0.5,
          strokeWeight: 1,
        })
      );
    }

    newLines.forEach((line) => line.setMap(map));
    gridLinesRef.current = newLines;
  };
  // ==== SHOW GRID ========================================================
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (showGrid) {
      generateGridLines();
      const listener = map.addListener("bounds_changed", () => {
        generateGridLines();
      });
      return () => {
        google.maps.event.removeListener(listener);
        gridLinesRef.current.forEach((line) => line.setMap(null));
      };
    } else {
      gridLinesRef.current.forEach((line) => line.setMap(null));
      gridLinesRef.current = [];
    }
  }, [showGrid]);

  // ==== RESULTADO SEARCH ========================================================

  useEffect(() => {
    if (!pesquisaFeita) return; // ✅ ignora o efeito se ainda não houve pesquisa

    if (shapes.length > 0) {
      setToastMessage(`Total de shapes encontrados: ${totalRegistros}`);
    } else {
      setToastMessage(`Nenhum shape encontrado.`);
    }

    setLoading(false);

    const timer = setTimeout(() => {
      setToastMessage(null);
      centralizarNasCamadas();
    }, 1500);

    return () => clearTimeout(timer);
  }, [shapes, pesquisaFeita]);


  // ==== SEARCH ========================================================
  const setSearch = (valor: {}) => {
    if (!valor) return;
    setPesquisaFeita(true); // ✅ marca que uma pesquisa foi feita
    dispatch(shapeSearchRequest(valor));
  };


  // ==== INICIALIZAÇÃO ========================================================
  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    map.setMapTypeId(mapType as google.maps.MapTypeId);

    // === EVENTOS DE MOUSE NAS ÁREAS PLOTADAS ===
    map.data.addListener("mouseover", (event: any) => {
      const nome = event.feature.getProperty("nome") || event.feature.getProperty("id") || "Área sem nome";
      const cor = event.feature.getProperty("cor") || "#009688";

      // Converte a posição para pixel na tela
      const projection = map.getProjection();
      const latLng = event.latLng;
      if (!latLng || !projection) return;

      const point = fromLatLngToPoint(latLng, map);

      setHoverInfo({
        text: nome,
        x: point.x,
        y: point.y,
      });

      // Destaque visual temporário
      map.data.overrideStyle(event.feature, {
        fillOpacity: 0.6,
        strokeWeight: 1.5,
        strokeColor: cor,
      });
    });

    map.data.addListener("mouseout", (event: any) => {
      map.data.revertStyle(event.feature);
      setHoverInfo(null);
    });
  };

  function fromLatLngToPoint(latLng: google.maps.LatLng, map: google.maps.Map) {
    const topRight = map.getProjection()?.fromLatLngToPoint(map.getBounds()!.getNorthEast());
    const bottomLeft = map.getProjection()?.fromLatLngToPoint(map.getBounds()!.getSouthWest());
    const scale = Math.pow(2, map.getZoom()!);
    const worldPoint = map.getProjection()?.fromLatLngToPoint(latLng);
    return {
      x: (worldPoint!.x - bottomLeft!.x) * scale,
      y: (worldPoint!.y - topRight!.y) * scale,
    };
  }


  // ==== MEDIÇÃO DE DISTÂNCIA ================================================
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    let clickListener: google.maps.MapsEventListener | null = null;
    let polyline: google.maps.Polyline | null = null;

    if (enabledMeasurement) {
      const currentCenter = map.getCenter();
      const currentZoom = map.getZoom();
      if (currentCenter) {
        setCenter({
          lat: currentCenter.lat(),
          lng: currentCenter.lng(),
        });
      }
      if (currentCenter && currentZoom) {
        map.setCenter(currentCenter);
        map.setZoom(currentZoom);
      }

      const pathTemp: google.maps.LatLngLiteral[] = [];

      polyline = new google.maps.Polyline({
        map,
        path: pathTemp,
        strokeColor: "#0c7402ff",
        strokeOpacity: 1,
        strokeWeight: 1.5,
        icons: [
          {
            icon: {
              path: "M 0,-1 0,1",
              strokeOpacity: 1,
              scale: 3,
            },
            offset: "0",
            repeat: "15px",
          },
        ],
      });

      clickListener = map.addListener(
        "click",
        (e: google.maps.MapMouseEvent) => {
          if (!e.latLng) return;
          const point = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          pathTemp.push(point);
          setPath([...pathTemp]);
          polyline!.setPath(pathTemp);

          if (pathTemp.length > 1) {
            const distanceCalc = google.maps.geometry.spherical.computeLength(
              pathTemp.map((p) => new google.maps.LatLng(p.lat, p.lng))
            );
            setDistance(distanceCalc);
          }
        }
      );
    }

    return () => {
      if (clickListener) google.maps.event.removeListener(clickListener);
      if (polyline) polyline.setMap(null);
    };
  }, [enabledMeasurement]);

  // ==== BUSCAR TOTAIS =======================================================
  useEffect(() => {
    dispatch(camadasTotalRequest());
  }, [dispatch]);

  useEffect(() => {
    if (camadasTotais) {
      setFontes(camadasTotais?.fontes || 0);
      setTipos(camadasTotais?.tipos || 0);
    }
  }, [camadasTotais]);

  // ==== PLOTAR / REMOVER GEOJSON ============================================AQUI
  const plotarShape = (geojson: any, idShape?: any, item?: any, nomeShape?: any) => {
    if (!mapRef.current || !geojson) return;
    const map = mapRef.current;

    try {
      let features: any[] = [];

      if (
        geojson.type === "FeatureCollection" &&
        Array.isArray(geojson.features)
      ) {
        features = geojson.features;
      } else if (geojson.type === "Feature") {
        features = [geojson];
      } else if (Array.isArray(geojson)) {
        features = geojson;
      } else return;

      const addedFeatures: google.maps.Data.Feature[] = [];

      features.forEach((f) => {
        if (typeof f.geometry === "string") {
          try {
            f.geometry = JSON.parse(f.geometry);
          } catch (e) {
            console.warn("Falha ao parsear geometry", e);
          }
        }

        const feature = map.data.addGeoJson({
          type: "FeatureCollection",
          features: [f],
        })[0];


        if (feature) {
          feature.setProperty("cor", item.corCamada || "#009688");
          feature.setProperty("nome", nomeShape);
          addedFeatures.push(feature)
        };
      });

      if (idShape && addedFeatures.length > 0) {
        featureMap.current[idShape] = addedFeatures;
      }
  
      map.data.setStyle((feature) => {
        const featureColor = feature.getProperty("cor") || "#009688";
        const geometry = feature.getGeometry();
        const geometryType = geometry ? geometry.getType() : "";

        if (geometryType.includes("Polygon")) {
          return {
            fillColor: featureColor,
            fillOpacity: 0.36,
            strokeColor: featureColor,
            strokeWeight: 1.2,
          };
        }


        if (geometryType.includes("LineString")) {
          return {
            strokeColor: featureColor,
            strokeWeight: 2.5,
          };
        }

        if (geometryType.includes("Point")) {
          return {
            icon: {
              path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z M12 11.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
              fillColor: featureColor,
              fillOpacity: 1,
              strokeColor: "#000",
              strokeWeight: 1,
              scale: 1.5,
              anchor: new google.maps.Point(12, 24),
            },
          };
        }


        // fallback
        return {
          strokeColor: featureColor,
          strokeWeight: 1,
        };
      });


      const bounds = new google.maps.LatLngBounds();
      map.data.forEach((feature) => {
        feature
          .getGeometry()
          ?.forEachLatLng((latLng) => bounds.extend(latLng));
      });

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
        if (map.getZoom() && map.getZoom() > 16) map.setZoom(16);
      }
    } catch (err) {
      console.error("plotarShape: erro", err);
    }
  };

  // ==== REMOÇÃO ================================================
  const removerShape = (idShape: any) => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const features = featureMap.current[idShape];

    if (features && features.length > 0) {
      features.forEach((f) => {
        try {
          if (map.data && map.data.contains(f)) {
            map.data.remove(f);
          }
        } catch (e) {
          console.warn("Erro ao remover feature:", e);
        }
      });
      delete featureMap.current[idShape];
    }

    map.data.forEach((feature) => {
      const props = feature.getProperty("idShape");
      if (props && props === idShape) {
        map.data.remove(feature);
      }
    });

    setGeojsonLocal((prev) => prev.filter((f) => f.idShape !== idShape));
  };

  // ==== MONITORAR FILTROS ===================================================
  useEffect(() => {
    if (!mapRef.current) return;

    const idsAtivos = camadasFiltro.map((f) => f.idShape);

    Object.keys(featureMap.current).forEach((id) => {
      const idNum = Number(id);
      if (!idsAtivos.includes(id)) {
        removerShape(id);
      }
    });

    camadasFiltro.forEach((filtro) => {
      if (!featureMap.current[filtro.idShape]) {
        setIdShapeSelecionado(filtro.idShape);
        setNomeShapeSelecionado(filtro.nome);
        dispatch(camadaRequest(filtro.idBase));
      }
    });

    setLoading(false);
  }, [camadasFiltro, dispatch]);

  // ==== QUANDO A CAMADA CHEGAR, PLOTAR ======================================
  useEffect(() => {
    if (camada) filtrarCamadaRequest(camada, idShapeSelecionado);
  }, [camada]);

  const filtrarCamadaRequest = async (
    item: Camada,
    idShape?: any | null,
  ) => {
    if (!item) return;
    const idToUse = idShape ?? idShapeSelecionado;
    const nomeShape = nomeShapeSelecionado ?? "";

    if (item.campos && idToUse) {
      const camposArray = item.campos
        .split(",")
        .map((c: string) => c.trim())
        .filter(Boolean);

      const primeiroCampo = camposArray[0];
      const ultimoCampo = camposArray[camposArray.length - 1];

      const url = `${item.url}?service=${item.service}&version=${item.version}&request=GetFeature&typeName=${item.camadaGeoserver}&propertyName=${primeiroCampo},${ultimoCampo}&CQL_FILTER=${primeiroCampo}=${idToUse.split('_')[0]}&outputFormat=application/json`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao buscar dados do WFS");

        const data = await response.json();
        if (data?.features?.length > 0) {

          plotarShape(data, idToUse, item, nomeShape);
          setGeojsonLocal((prev) => [...prev, ...data.features]);
        } else {
          console.warn("Nenhuma feature válida recebida do WFS");
        }
      } catch (err) {
        console.error("Erro WFS:", err);
      }
    }
  };

  // ==== CENTRALIZAR APÓS TOAST ==============================================

  useEffect(() => {
    if (shapes.length > 0) {
      setToastMessage(`Total de shapes encontrados: ${totalRegistros}`);
      setLoading(false);

      // Oculta mensagem e centraliza o mapa após 3s
      const timer = setTimeout(() => {
        setToastMessage(null);
        centralizarNasCamadas();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [shapes]);

  const centralizarNasCamadas = () => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    const bounds = new google.maps.LatLngBounds();
    map.data.forEach((feature) => {
      feature.getGeometry()?.forEachLatLng((latLng) => bounds.extend(latLng));
    });
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds);
      map.setCenter(bounds.getCenter());
    }
  };

  // ==== CENTRALIZA AO PLOTAR ================================================
  useEffect(() => {
    if (geojsonLocal.length > 0 && mapRef.current) {
      const map = mapRef.current;
      const bounds = new google.maps.LatLngBounds();
      map.data.forEach((feature) =>
        feature.getGeometry()?.forEachLatLng((latLng) => bounds.extend(latLng))
      );
      if (!bounds.isEmpty()) map.fitBounds(bounds);
    }
  }, [geojsonLocal]);

  // ==== RENDER ===============================================================
  if (!isLoaded)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={s.container}>
      {loading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="rgba(255,255,255,0.5)"
          zIndex={10}
        >
          <CircularProgress />
        </Box>
      )}
      {/* TOAST INTERNO */}
      {toastMessage && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgba(0, 150, 136, 0.95)",
            color: "white",
            px: 3,
            py: 2,
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
            fontSize: "1rem",
            zIndex: 20,
            textAlign: "center",
            animation: "fadeInOut 3s ease",
          }}
        >
          {toastMessage}
        </Box>
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        options={{
          disableDefaultUI: true,
          fullscreenControl: false,
          draggableCursor: enabledMeasurement ? "crosshair" : undefined,
        }}
      />

      {hoverInfo && (
        <Box
          sx={{
            position: "absolute",
            left: hoverInfo.x,
            top: hoverInfo.y,
            transform: "translate(-50%, -100%)",
            bgcolor: "rgba(0, 0, 0, 0.75)",
            color: "#fff",
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: "0.8rem",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 30,
          }}
        >
          {hoverInfo.text}
        </Box>
      )}


      <PainelFiltroMapa
        mapType={mapType}
        onMapTypeChange={(type) => {
          setMapType(type);
          mapRef.current?.setMapTypeId(type as google.maps.MapTypeId);
        }}
        onZoomIn={() =>
          mapRef.current?.setZoom((mapRef.current?.getZoom() ?? 12) + 1)
        }
        onZoomOut={() =>
          mapRef.current?.setZoom((mapRef.current?.getZoom() ?? 12) - 1)
        }
        onToggleGrid={() => setShowGrid((v) => !v)}
        onMeasureDistance={() => setEnabledMeasurement((v) => !v)}
        onPrint={() => window.print()}
        isBasePanelOpen={isBasePanelOpen}
        onToggleBasePanel={() => setIsBasePanelOpen((v) => !v)}
        isMeasurement={enabledMeasurement}
        isShowGrid={showGrid}
        setSearch={setSearch}
      />

      <CardMapa stats={{ camadas, tipos, fontes }} />

      <PainelCamadasMapa
        open={isBasePanelOpen}
        onClose={() => setIsBasePanelOpen(false)}
        setCamadaFiltro={setCamadasFiltro}
        setLoading={setLoading}
        setCamadas={setCamadas}
      />

      {enabledMeasurement && path.length > 0 && (
        <PainelDistanciaMapa distance={distance} />
      )}

      <Box sx={s.texto}>
        Ferramenta de Inteligência Espacial para uso Interno
      </Box>
    </Box>
  );
}
