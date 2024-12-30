import {Box, IconButton} from "@mui/material";
import {Cancel, Check, Close, DeleteForever, Edit, Save} from "@mui/icons-material";
import {ReviewInterface} from "../interfaces.tsx";

interface ReviewButtonsProps {
  review: ReviewInterface;
  userId: string;
  role: string;
  editingReviewId: string | null;
  deletingReviewId: string | null;
  setDeletingReviewId: (id: string | null) => void;
  handleSaveClick: (id: string) => void;
  handleEditClick: (id: string, comment: string, rating: number) => void;
  handleDiscardClick: () => void;
  handleDeleteClick: (id: string) => void;
  handleConfirmDeleteClick: (id: string) => void;
}

export default function ReviewButtons({
                                        review,
                                        userId,
                                        role,
                                        editingReviewId,
                                        deletingReviewId,
                                        setDeletingReviewId,
                                        handleSaveClick,
                                        handleEditClick,
                                        handleDiscardClick,
                                        handleDeleteClick,
                                        handleConfirmDeleteClick
                                      }: ReviewButtonsProps) {
  return (
    <Box sx={{display: "flex", width: "100px", justifyContent: "center"}}>
      {(role === "admin" || review.user.userId === userId) &&
        (deletingReviewId === review._id ?
          <>
            <IconButton color={"success"} onClick={() => handleConfirmDeleteClick(review._id)}>
              <Check/>
            </IconButton>
            <IconButton color={"error"} onClick={() => setDeletingReviewId(null)}>
              <Close/>
            </IconButton>
          </>
          :
          <>
            {editingReviewId === review._id ? (
              <IconButton onClick={() => handleSaveClick(review._id)}>
                <Save/>
              </IconButton>
            ) : (
              <IconButton onClick={() => handleEditClick(review._id, review.comment, review.rating)}>
                <Edit/>
              </IconButton>
            )}
            {
              editingReviewId === review._id ?
                <IconButton color={"error"} onClick={() => handleDiscardClick()}>
                  <Cancel/>
                </IconButton> :
                <IconButton color={"error"} onClick={() => handleDeleteClick(review._id)}>
                  <DeleteForever/>
                </IconButton>
            }
          </>)}
    </Box>
  )
}