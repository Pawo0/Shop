import {
  Avatar,
  Box, Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid2, IconButton,
  Rating, TextField,
  Typography
} from "@mui/material";
import {ProductsInterface} from "../interfaces.tsx";
import {DeleteForever, Edit, ReviewsOutlined} from "@mui/icons-material";
import React, {useEffect, useState} from "react";

export default function Reviews({product}: { product: ProductsInterface | null }) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [ratingError, setRatingError] = useState<boolean>(false);
  const [commentError, setCommentError] = useState<boolean>(false);

  const [reviews, setReviews] = useState<ProductsInterface["reviews"]>([])

  useEffect(() => {
    if (!product) return
    fetch(`http://localhost:5000/api/reviews/product/${product._id}`)
      .then(res => res.json())
      .then(data => setReviews(data.reviews))
  }, [product]);

  const handleRatingChange = (_: React.SyntheticEvent, value: number | null) => {
    if (value) setRating(value)
  }

  const handleSubmit = () => {
    if (!rating) setRatingError(true)
    else setRatingError(false)
    if (comment.length < 3) setCommentError(true)
    else setCommentError(false)
    if (!rating || !comment) return

    fetch(`http://localhost:5000/api/reviews/add`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rating, comment, user: {
          userId: "676cbb266855535f0d02947d",
          username: "derek"
        }, productId: product?._id
      })
    })
      .then(res => res.json())
      .then(data => {
          console.log(data)
          if (data.success) {
            setReviews([...reviews, data.review])
          }
        }
      )

    console.log(rating, comment)
    setComment("")
    setRating(0)
  }
  return (
    <Grid2 size={12}>{
      product &&
        <Card>
            <CardHeader title={<>Reviews <ReviewsOutlined/></>}/>
            <Divider/>
            <CardContent>
              {reviews.map((review, idx) => (

                <Box key={idx} sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  '&:hover': {
                    backgroundColor: "#f0f0f0"
                  },
                  padding: "5px 16px",
                  cursor: "pointer",
                  borderRadius: 4
                }}>
                  <Avatar>{review.user.username.charAt(0)}</Avatar>
                  <Box sx={{ml: 2, flex: 1}}>
                    <Typography variant="body2" color="textSecondary">{review.user.username}</Typography>
                    <Rating value={review.rating} readOnly/>
                    <Typography variant="body1">{review.comment}</Typography>
                    <Typography variant="caption" color="textSecondary">{review.date}</Typography>
                  </Box>
                  <Box sx={{display: "flex", width: "100px", justifyContent: "center"}}>
                    {review.user.userId === "676cbb266855535f0d02947d" &&
                        <>
                            <IconButton>
                                <Edit/>
                            </IconButton>
                            <IconButton color={"error"}>
                                <DeleteForever/>
                            </IconButton>
                        </>}
                  </Box>
                </Box>
              ))}
                <Divider/>
            </CardContent>
            <CardActions>
                <Box p={2} width="100%">
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
                        helperText={commentError ? "Comment must have at least 3 letters..." : ""}
                    />
                    <Box sx={{display: "flex", justifyContent: "flex-end", mt: 2}}>
                        <Button variant={"contained"} onClick={handleSubmit}>Submit</Button>
                    </Box>
                </Box>
            </CardActions>
        </Card>
    }</Grid2>
  )
}