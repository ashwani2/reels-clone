/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Carousel } from "react-responsive-carousel";

//next inbuilt image tag
import Image from "next/image";
import insta from "../../assets/insta.png";
import bg1 from "../../assets/bg1.png";
import bg2 from "../../assets/bg2.png";
import bg3 from "../../assets/bg3.png";
import bg4 from "../../assets/bg4.png";
import { AuthContext } from "../../context/auth.js";
import Link from "next/link";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { forgot, user } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError("");
      await forgot(email);
      console.log("Email sent");
      router.push("/login");
    } catch (err) {
      console.log(err);
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
    else{
      console.log("User Not Present");
    }
  }, [user]);

  return (
    <div className="login-container">
      <div className="carbg">
        <div className="car">
          <Carousel
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            infiniteLoop={true}
            interval={2000}
            autoPlay={true}
          >
            <Image alt="first Image" src={bg1}></Image>
            <Image alt="second Image" src={bg2}></Image>
            <Image alt="third Image" src={bg3}></Image>
            <Image alt="fourth Image" src={bg4}></Image>
          </Carousel>
        </div>
      </div>
      <div>
        <div className="login-card">
          <Image alt="logo" src={insta} />
          <TextField
            id="outlined-basic"
            size="small"
            margin="dense"
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          

          {error != "" && <div style={{ color: "red" }}>{error}</div>}

          <Button
            variant="contained"
            fullWidth
            style={{ marginTop: "1rem" }}
            onClick={handleClick}
            disabled={loading}
          >
            Send Email
          </Button>
          
        </div>
        <div className="bottom-card">
          Don&apos;t Have an Account?<Link href="/login"><span style={{ color: "blue" }}>Signup</span></Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
