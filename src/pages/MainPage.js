import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";
import Loading from "../components/Loading";
import Input from "../components/Input";
import styled from "@emotion/styled";

function MainPage() {
  const [isAsked, setIsAsked] = useState(false);

  const [hasError, setHasError] = useState(false);

  const answers = [
    "CEVAP",
    "UZUUUUUUUUUUUUUUUUUN CEVAP",
    "DAHAAAAAAAA UZUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUN CEVAPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP",
  ];

  const [questions, setQuestions] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    
    setOpen(true);
  };
  const handleClose = () => {
    askQuestion(text);
    setOpen(false);
  };

  function askQuestion(text) {
    if (isAsked) {
      return;
    }
    if (text.trim().length === 0) {
      setHasError(true);
      return;
    }
    if (!hasError) {
      setQuestions((prev) => [...prev, text]);
      setText("");
      console.log(questions);
      setIsAsked(true);
      setTimeout(function () {
        setQuestions((prev) => [
          ...prev,
          answers[Math.floor(Math.random() * 3)],
        ]);
        setIsAsked(false);
      }, 2000);
    }
  }

  function clearChat() {
    if (!isAsked) {
      setQuestions([]);
      setIsAsked(false);
    }
  }

  const [text, setText] = useState("");

  function textFieldHandler(value) {
    console.log(value);
    setHasError(false);
    setText(value.target.value);
  }
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [isAsked]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
       
        <DialogTitle>Almam Gereken Bilgiler</DialogTitle>
        <Box sx={{backgroundColor: "#374259"}}>
        <DialogContent >
          <DialogContentText color="white">
            Sorularına cevap bulmam için aşağıdaki bazı bilgileri doldurman
            gerekebilir.
          </DialogContentText>
          <Grid container>
            <Grid item xs={6}>
              <Box margin={1}>
                <Typography color="white">
                  Sorulardan örnek bir tanesi
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 3,
                    width: "100%",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box margin={1}>
                <Typography color="white">
                  Başka soru
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 3,
                    width: "100%",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box margin={1}>
                <Typography color="white">
                  Sorulardan örnek bir tanesi?
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 3,
                    width: "100%",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box margin={1}>
                <Typography color="white">
                  Sorulardan örnek bir tanesi?
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 3,
                    width: "100%",
                  }}
                />
              </Box>
              
            </Grid>
            
          </Grid>
        </DialogContent>
        <DialogActions>
        <ColorButton2 onClick={handleClose} variant="text">Vazgeç</ColorButton2>
        <ColorButton onClick={handleClose} variant="text">Gönder</ColorButton>
        </DialogActions>
        </Box>
      </Dialog>
      <Grid container>
        <Navbar clearChat={clearChat} />

        <Chat questions={questions} />

        <Loading isAsked={isAsked} />
        <div ref={lastMessageRef} />
        <Input
          hasError={hasError}
          text={text}
          textFieldHandler={textFieldHandler}
          askQuestion={askQuestion}
          isAsked={isAsked}
          handleOpen={handleOpen}
        />
      </Grid>
    </>
  );
}

export default MainPage;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ColorButton = styled(Button)(({ theme }) => ({
  marginY: 1,

  color: "#374259",
  backgroundColor: "white",
  '&:hover': {
    backgroundColor: "#374259",
    color: "white"
  },
}));

const ColorButton2 = styled(Button)(({ theme }) => ({
  marginY: 1,

  color: "white",
  backgroundColor: "red",
  '&:hover': {
    backgroundColor: "#374259",
    color: "white"
  },
}));