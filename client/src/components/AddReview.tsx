import {Box, Button, CardActions, Rating, TextField, Typography} from "@mui/material";
import React from "react";

interface AddReviewProps {
  rating: number,
  comment: string,
  setComment: React.Dispatch<React.SetStateAction<string>>,
  ratingError: boolean,
  commentError: boolean,
  handleRatingChange: (event: React.SyntheticEvent, value: number | null) => void,
  handleSubmit: () => void
}

export default function AddReview({
                                    rating,
                                    comment,
                                    setComment,
                                    ratingError,
                                    commentError,
                                    handleRatingChange,
                                    handleSubmit
                                  }: AddReviewProps) {
  return (
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
  )
}