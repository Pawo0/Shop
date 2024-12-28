import {Box, Pagination} from "@mui/material";
import React from "react";

export default function PaginationControls({page, allPages, handlePageChange}: {page: number, allPages: number, handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void}) {
  return (
    <Box sx={{display: 'flex', flexDirection: 'row', pt: 4, justifyContent: "center"}}>
      <Pagination hidePrevButton hideNextButton count={allPages} boundaryCount={2} page={page} onChange={handlePageChange}/>
    </Box>
  )
}