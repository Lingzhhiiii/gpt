import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import { ErrorOutline as ErrorOutlineIcon } from "@mui/icons-material";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // 设置容器高度为整个屏幕高度
  },
} as const;

const AuthFail: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <ErrorOutlineIcon color="error" style={{ fontSize: 80 }} />
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            权限不足
          </Typography>
          <Typography variant="body1" paragraph>
            抱歉，您没有足够的权限。
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthFail;
