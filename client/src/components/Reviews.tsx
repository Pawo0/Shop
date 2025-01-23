import {
  Alert, AlertTitle,
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  Typography
} from "@mui/material";
import {ProductsInterface} from "../interfaces.tsx";
import {ReviewsOutlined} from "@mui/icons-material";
import React, {useContext, useEffect, useState} from "react";
import AddReview from "./AddReview.tsx";
import ReviewButtons from "./ReviewButtons.tsx";
import {Link} from "react-router-dom";
import ReviewBlock from "./ReviewBlock.tsx";
import {UserContext} from "../contexts/UserContext.tsx";
import axios from "axios";

export default function Reviews({product}: { product: ProductsInterface | null }) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [ratingError, setRatingError] = useState<boolean>(false);
  const [commentError, setCommentError] = useState<boolean>(false);
  const [reviews, setReviews] = useState<ProductsInterface["reviews"]>([]);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string>("");
  const [editingCommentError, setEditingCommentError] = useState(false);
  const [editingRating, setEditingRating] = useState<number>(0);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [reviewAdded, setReviewAdded] = useState<boolean>(false)


  const userContext = useContext(UserContext)
  const {userId, username, role} = userContext!


  useEffect(() => {
    if (!product) return;
    axios.get(`http://localhost:5000/api/reviews/product/${product._id}`)
      .then(res => setReviews(res.data.reviews))
      .catch(err => console.error('Error fetching reviews:', err));
  }, [product]);

  const handleRatingChange = (_: React.SyntheticEvent, value: number | null) => {
    if (value) setRating(value);
  };

  const commentValidation = () => {
    if (!rating) setRatingError(true);
    else setRatingError(false);
    if (comment.trim().length < 1) setCommentError(true);
    else setCommentError(false);
    return !(!rating || comment.trim().length < 1);
  }

  const editCommentValidation = () => {
    if (editingComment.trim().length < 1) setEditingCommentError(true)
    else setEditingCommentError(false)
    return !(editingComment.trim().length < 1)
  }

  const handleSubmit = async () => {
    if (!commentValidation()) return


    const res = await axios.post(`http://localhost:5000/api/reviews/add`, {
      rating,
      comment,
      user: {userId, username},
      productId: product?._id
    });
    if (res.data.success) {
      setReviews([...reviews, res.data.review]);
      setReviewAdded(true);
    }

    console.log(rating, comment);
    // reset form
    setComment("");
    setRating(0);
  };

  const handleEditClick = (reviewId: string, currentComment: string, currentRating: number) => {
    setEditingReviewId(reviewId);
    setEditingComment(currentComment);
    setEditingRating(currentRating);
  };

  const handleSaveClick = async (reviewId: string) => {
    if (!editCommentValidation()) return

    try {
      const res = await axios.patch(`http://localhost:5000/api/reviews/${reviewId}`, {
        comment: editingComment,
        rating: editingRating
      });
      if (res.data.success) {
        setReviews(reviews.map(review => review._id === reviewId ? {
          ...review,
          comment: editingComment,
          rating: editingRating,
          updatedAt: res.data.review.updatedAt
        } : review));
        setEditingReviewId(null);
        setEditingComment("");
        setEditingRating(0);
      }
    } catch (err) {
      console.error('Error updating review:', err);
    }

  };

  const handleDiscardClick = () => {
    setEditingReviewId(null);
    setEditingComment("");
    setEditingRating(0);
  }

  const handleDeleteClick = (reviewId: string) => {
    setDeletingReviewId(reviewId);
  }

  const handleConfirmDeleteClick = async (reviewId: string) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`);
      if (res.data.success) {
        setReviews(reviews.filter(review => review._id !== reviewId));
        setReviewAdded(false);
      }
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  }

  return (
    <Grid2 size={12}>{
      product &&
        <Card>
            <CardHeader title={<>Reviews <ReviewsOutlined/></>}/>
            <Divider/>
            <CardContent>
              {reviews.map((review, idx) => {
                if (review.user.userId === userId && !reviewAdded) {
                  setReviewAdded(true)
                }
                return (
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

                    <ReviewBlock review={review} editingReviewId={editingReviewId} editingRating={editingRating}
                                 setEditingRating={setEditingRating} editingComment={editingComment}
                                 setEditingComment={setEditingComment} editingCommentError={editingCommentError}/>

                    <ReviewButtons review={review} userId={userId} role={role} editingReviewId={editingReviewId}
                                   deletingReviewId={deletingReviewId}
                                   setDeletingReviewId={setDeletingReviewId} handleSaveClick={handleSaveClick}
                                   handleEditClick={handleEditClick} handleDiscardClick={handleDiscardClick}
                                   handleDeleteClick={handleDeleteClick}
                                   handleConfirmDeleteClick={handleConfirmDeleteClick}/>

                  </Box>
                )
              })}
            </CardContent>
            <Divider/>
          {
            (userId !== "" && !reviewAdded) ?
              <AddReview rating={rating} comment={comment} setComment={setComment} ratingError={ratingError}
                         commentError={commentError} handleRatingChange={handleRatingChange}
                         handleSubmit={handleSubmit}/> :
              <Box sx={{p: 2}}>
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  <Typography variant="body1">
                    {
                      reviewAdded ?
                        "You have already added a review for this product." :
                        <><Link to={`/signin?redirect=/product/${product?._id}`}>Login</Link>, to add a comment.</>
                    }
                  </Typography>
                </Alert>
              </Box>
          }

        </Card>
    }</Grid2>
  );
}