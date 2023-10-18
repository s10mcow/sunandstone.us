import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import { PageContainer } from "./template/PageContainer";
import { resetAuthenticatedUser } from "../../services/Authentication.ts";
import Grid from "../common/layout/Grid.ts";
import { useSnackbar } from "notistack";
import { usePosts } from "../../services/Posts.ts";
import { useAppErrorHandlers } from "../../services/ErrorMessaging.ts";

export function Home() {
  const { enqueueSnackbar } = useSnackbar();

  function handleLogOut() {
    resetAuthenticatedUser();
    enqueueSnackbar("Logged out", { variant: "success" });
  }

  const {
    data: posts,
    error: postsError,
    isLoading: isLoadingPosts,
  } = usePosts();

  useAppErrorHandlers([
    {
      error: postsError,
      id: "Home-postsError",
    },
  ]);

  return (
    <PageContainer isAuthRequired={true}>
      <Grid container direction="column" spacing={2}>
        <Grid>
          <Typography variant="h1">Home</Typography>
        </Grid>
        <Typography variant="h2">Posts</Typography>
        <Grid container direction="row" spacing={2}>
          {isLoadingPosts && <CircularProgress />}
          {posts?.map((post) => (
            <Grid xs={6}>
              <Paper sx={{ minWidth: 200, minHeight: 400, p: 4 }}>
                <Typography variant="h4">{post.title}</Typography>
                <Typography variant="body1">
                  {post?.body?.substring(0, 50)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Grid>
          <Button onClick={handleLogOut}>Logout</Button>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
