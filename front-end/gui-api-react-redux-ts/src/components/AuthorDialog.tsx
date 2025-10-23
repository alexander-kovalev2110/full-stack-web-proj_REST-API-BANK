import React, { useRef } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { closeAuthor } from "../store/actions/modalWindAction";
import { fetchCust } from "../store/actions/custAction";
import { AuthorKind } from "../store/interfaces";
import { RootState } from "../store/reducers";

const AuthorDialog: React.FC = () => {
  const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { authorOpen, authorKind } = useTypeSelector(
    (state) => state.modalWind
  );
  const dispatch = useDispatch<any>();

  const nameRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)

//   const handleClose = () => {
//     // снимаем фокус с активного элемента, чтобы ARIA warning не появлялся
//     (document.activeElement as HTMLElement | null)?.blur();
//     dispatch(closeAuthor());
//   };

  const handleRequest = (kind: AuthorKind) => {
    const name = nameRef.current?.value || ""
    const pw = pwRef.current?.value || ""

    dispatch(closeAuthor())
    dispatch(() => fetchCust(kind, name, pw))
  };

  return (
    <Dialog open={authorOpen} onClose={() => dispatch(closeAuthor())} maxWidth="xs" fullWidth>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => dispatch(closeAuthor())}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[700],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <TextField
          inputRef={nameRef}
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          inputRef={pwRef}
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />
      </DialogContent>

      <DialogActions>
        {authorKind === "Login" ? (
          <Button
            variant="outlined"
            startIcon={<LoginIcon />}
            onClick={() => handleRequest(authorKind)}
          >
            Log in
          </Button>
        ) : (
          <Button
            variant="outlined"
            startIcon={<PersonAddIcon />}
            onClick={() => handleRequest(authorKind)}
          >
            Sign up
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AuthorDialog;
