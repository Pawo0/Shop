import {Box, Rating, TextField, Typography} from "@mui/material";
import {ReviewInterface} from "../interfaces.tsx";
import {format} from "date-fns";

interface ReviewBlockProps {
  review: ReviewInterface;
  editingReviewId: string | null;
  editingRating: number;
  setEditingRating: (rating: number) => void;
  editingComment: string;
  setEditingComment: (comment: string) => void;
  editingCommentError: boolean;
}

export default function ReviewBlock({review, editingReviewId,  editingRating, setEditingRating, editingComment, setEditingComment, editingCommentError}: ReviewBlockProps){
  return (
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
          error={editingCommentError}
          helperText={editingCommentError ? "Comment can't be empty" : ""}
          onChange={(e) => setEditingComment(e.target.value)}
        />
      ) : (
        <Typography variant="body1">{review.comment}</Typography>
      )}
      <Typography variant="caption" color="textSecondary">
        {format(new Date(review.createdAt), "dd/MM/yyyy HH:mm:ss")}
        {review.createdAt !== review.updatedAt && " (edited)"}
      </Typography>
    </Box>
  )
}