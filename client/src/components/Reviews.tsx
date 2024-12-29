import {
  Avatar,
  Box, Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  Rating, TextField,
  Typography
} from "@mui/material";
import {ProductsInterface} from "../interfaces.tsx";
import {ReviewsOutlined} from "@mui/icons-material";
import React, {useState} from "react";

export default function Reviews({product}: { product: ProductsInterface | null }) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [ratingError, setRatingError] = useState<boolean>(false);
  const [commentError, setCommentError] = useState<boolean>(false);

  const handleRatingChange = (_: React.SyntheticEvent, value: number | null) => {
    if (value) setRating(value)
  }

  const handleSubmit = () => {
    if (!rating) setRatingError(true)
    else setRatingError(false)
    if (comment.length < 3) setCommentError(true)
    else setCommentError(false)
    if (!rating || !comment) return

    // todo send review to the server
    console.log(rating, comment)
    setComment("")
    setRating(0)
  }
  return (
    <Grid2 size={12}>
      <Card>
        <CardHeader title={<>Reviews <ReviewsOutlined/></>}/>
        <Divider/>
        <CardContent>
          {product?.reviews.map((review, idx) => (

            <Box key={idx} sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              '&:hover': {
                backgroundColor: "#f0f0f0"
              },
              pl: 1,
              cursor: "pointer"
            }}>
              <Avatar>{review.username.charAt(0)}</Avatar>
              <Box sx={{ml: 2}}>
                <Typography variant="body2" color="textSecondary">{review.username}</Typography>
                <Rating value={review.rating} readOnly/>
                <Typography variant="body1">{review.comment}</Typography>
                <Typography variant="caption" color="textSecondary">{review.date}</Typography>
              </Box>
            </Box>
          ))}
          <Divider/>
        </CardContent>
        <CardActions>
          <Box p={2}>
            <Typography variant="h6">Add a review</Typography>
            {ratingError && <Typography color="error">Rating is required</Typography>}
            <Rating value={rating} onChange={handleRatingChange}/>
            <TextField
              label={"Review"}
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{mt: 2}}
              error={commentError}
              helperText={commentError ? "Comment is required" : ""}
            />
            <Box sx={{display: "flex", justifyContent: "flex-end", mt: 2}}>
              <Button variant={"contained"} onClick={handleSubmit}>Submit</Button>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Grid2>
  )
}