import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  Rating,
  TextField,
  Typography
} from "@mui/material";
import {ProductsInterface} from "../interfaces.tsx";
import {ReviewsOutlined} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import AddReview from "./AddReview.tsx";
import ReviewButtons from "./ReviewButtons.tsx";

export default function Reviews({product}: { product: ProductsInterface | null }) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [ratingError, setRatingError] = useState<boolean>(false);
  const [commentError, setCommentError] = useState<boolean>(false);
  const [reviews, setReviews] = useState<ProductsInterface["reviews"]>([]);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string>("");
  const [editingRating, setEditingRating] = useState<number>(0);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

  const tmpUserId = "676cbb266855535f0d02947d"
  const tmpUsername = "derek"

  useEffect(() => {
    if (!product) return;
    fetch(`http://localhost:5000/api/reviews/product/${product._id}`)
      .then(res => res.json())
      .then(data => setReviews(data.reviews));
  }, [product]);

  const handleRatingChange = (_: React.SyntheticEvent, value: number | null) => {
    if (value) setRating(value);
  };

  const handleSubmit = () => {
    if (!rating) setRatingError(true);
    else setRatingError(false);
    if (comment.length < 3) setCommentError(true);
    else setCommentError(false);
    if (!rating || !comment) return;

    fetch(`http://localhost:5000/api/reviews/add`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rating, comment, user: {
          userId: tmpUserId,
          username: tmpUsername
        }, productId: product?._id
      })
    })
      .then(res => res.json())
      .then(data => {
          console.log(data);
          if (data.success) {
            setReviews([...reviews, data.review]);
          }
        }
      );

    console.log(rating, comment);
    setComment("");
    setRating(0);
  };

  const handleEditClick = (reviewId: string, currentComment: string, currentRating: number) => {
    setEditingReviewId(reviewId);
    setEditingComment(currentComment);
    setEditingRating(currentRating);
  };

  const handleSaveClick = (reviewId: string) => {
    fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({comment: editingComment, rating: editingRating})
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          setReviews(reviews.map(review => review._id === reviewId ? {
            ...review,
            comment: editingComment,
            rating: editingRating
          } : review));
          setEditingReviewId(null);
          setEditingComment("");
          setEditingRating(0);
        }
      });
  };

  const handleDiscardClick = () => {
    setEditingReviewId(null);
    setEditingComment("");
    setEditingRating(0);
  }

  const handleDeleteClick = (reviewId: string) => {
    setDeletingReviewId(reviewId);
  }

  const handleConfirmDeleteClick = (reviewId: string) => {
    fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          setReviews(reviews.filter(review => review._id !== reviewId));
        }
      });
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
                    <Rating value={editingReviewId === review._id ? editingRating : review.rating}
                            readOnly={!(editingReviewId === review._id)}
                            onChange={(_, val) => {
                              console.log("change", val);
                              if (val) setEditingRating(val)
                            }
                            }/>
                    {editingReviewId === review._id ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        value={editingComment}
                        onChange={(e) => setEditingComment(e.target.value)}
                      />
                    ) : (
                      <Typography variant="body1">{review.comment}</Typography>
                    )}
                    <Typography variant="caption" color="textSecondary">{review.date}</Typography>
                  </Box>
                  <ReviewButtons review={review} tmpUserId={tmpUserId} editingReviewId={editingReviewId}
                                 deletingReviewId={deletingReviewId}
                                 setDeletingReviewId={setDeletingReviewId} handleSaveClick={handleSaveClick}
                                 handleEditClick={handleEditClick} handleDiscardClick={handleDiscardClick}
                                 handleDeleteClick={handleDeleteClick}
                                 handleConfirmDeleteClick={handleConfirmDeleteClick}/>

                </Box>
              ))}
            </CardContent>
            <Divider/>
            <AddReview rating={rating} comment={comment} setComment={setComment} ratingError={ratingError}
                       commentError={commentError} handleRatingChange={handleRatingChange} handleSubmit={handleSubmit}/>
        </Card>
    }</Grid2>
  );
}