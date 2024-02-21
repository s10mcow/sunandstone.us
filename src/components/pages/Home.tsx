import { CircularProgress, Container, Paper, Typography } from "@mui/material";
import Grid from "../common/layout/Grid";
import { usePosts } from "../../services/Posts";
import { useAppErrorHandlers } from "../../services/ErrorMessaging";

export function Home() {
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
    <Container maxWidth={"md"}>
      <Grid container direction="column" spacing={2}>
        <Grid>
          <Typography variant="h1">Home</Typography>
        </Grid>
        <Typography variant="h2">Posts</Typography>
        <Grid container direction="row" spacing={2}>
          {isLoadingPosts && <CircularProgress />}
          {posts?.map((post) => (
            <Grid xs={6} key={post.id}>
              <Paper sx={{ minWidth: 200, minHeight: 200, p: 4 }}>
                <Typography variant="h4">{post.title}</Typography>
                <Typography variant="body1">
                  {post?.body?.substring(0, 50)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
