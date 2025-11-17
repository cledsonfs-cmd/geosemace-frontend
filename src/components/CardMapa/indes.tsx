import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import CategoryIcon from "@mui/icons-material/Category";
import PublicIcon from "@mui/icons-material/Public";
import * as s from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface CardMapaProps {
  stats?: { camadas: number; tipos: number; fontes: number };
}

const formatNumber = (n: number) =>
  new Intl.NumberFormat("pt-BR").format(n ?? 0);

export default function CardMapa({
  stats = { camadas: 100, tipos: 50, fontes: 20 },
}: CardMapaProps): JSX.Element {



  const cards = [
    { label: "Camadas Cadastradas", value: stats.camadas, icon: <LayersIcon /> },
    { label: "Tipos de Camadas", value: stats.tipos, icon: <CategoryIcon /> },
    { label: "Fontes Consultadas", value: stats.fontes, icon: <PublicIcon /> },

  ];  

  return (
    <Box sx={s.cardsWrapper}>
      <Box sx={s.cardsContainer}>
        <Grid container spacing={2} justifyContent="center">
          {cards.map((stat, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={s.card}>
                <CardContent sx={s.cardContent}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={s.icon}>{stat.icon}</Box>
                    <Typography variant="subtitle2" sx={s.label}>
                      {stat.label}
                    </Typography>
                  </Stack>

                  <Typography variant="h4" sx={s.value}>
                    {formatNumber(stat.value)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
