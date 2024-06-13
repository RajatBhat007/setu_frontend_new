import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
  useParams,
} from "react-router-dom";
import { Dropdown, Layout, Space } from "antd";
import { connect } from "react-redux";
import "./styles.css";
import Login from "../pages/auth/login";
import { GlobalStyles } from "../Global.styles";
import { ExpandOutlined, CompressOutlined } from "@ant-design/icons";
import Signup from "../pages/auth/register";
import ForgotPassword from "../pages/auth/forgotpassword";
import NotFound from "../pages/notfound/notfound";
import Dashboard from "../pages/dashboard/dahsboard";
import Organisation from "../pages/organisation/organisation";
import ProtectedRoute from "./protectedRoute";
import backgroudnImage from "../assets/background.png";
import settings from "../assets/settings-icons/Settings.svg";
import { setIntroSteps, setLogin } from "../reduxStore/actions/action";
import auido from '../assets/music/audio.mp3'
import ApiClass from "../services/Api";
const { Content } = Layout;

const Root = ({  isAuthenticated }) => {
  const elementRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);


  const lockScreen = () => {
    var myScreenOrientation = window.screen.orientation;
    myScreenOrientation
      .lock("landscape")
      .then(() => {
        // Orientation locked successfully
        console.log("Screen orientation locked successfully");
      })
      .catch((error) => {
        // Handle the error
        console.error("Failed to lock screen orientation:", error.message);
      });
  };
  const handleOrientationChange = () => {
    if (window.screen.orientation) {
      // Request fullscreen mode
      const element = document.documentElement;
      const requestFullscreen =
        element.requestFullscreen ||
        element.webkitRequestFullscreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullscreen;

      if (requestFullscreen) {
        requestFullscreen
          .call(element)
          .then(() => {
            lockScreen();
            setIsFullScreen(true);
          })
          .catch((error) => {
            console.error("Failed to request fullscreen:", error);
          });
      }
    }
  };

  const handleOrientationChangeLogin=()=>{
    setTimeout(()=>{
      handleOrientationChange()
    },1000)
  }

  useEffect(() => {
    //preloading image
    ApiClass.header( isAuthenticated)
    const img = new Image();
    img.src = backgroudnImage;
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      exitFullScreen("window");
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "F11") {
        e.preventDefault();
      }
    });

    return () => {
      document.removeEventListener("fullscreenchange", exitFullScreen);
      window.removeEventListener("keydown", (e) => { });
    };
  }, []);
  const exitFullScreen = (input) => {
    if (input === "window" && document.fullscreenElement == null) {
      setIsFullScreen(false);
    } else if (input === "client" && document.fullscreenElement !== null) {
      try {
        if (document.exitFullscreen) {
          document
            .exitFullscreen()
            .then(() => {
              setIsFullScreen(false);
            })
            .catch((err) => {
              console.error("Failed to exit fullscreen:", err);
            });
        } else if (document.webkitExitFullscreen) {
          // For Safari
          document
            .webkitExitFullscreen()
            .then(() => {
              setIsFullScreen(false);
            })
            .catch((err) => {
              console.error("Failed to exit fullscreen:", err);
            });
        } else if (document.msExitFullscreen) {
          // For Internet Explorer
          document
            .msExitFullscreen()
            .then(() => {
              setIsFullScreen(false);
            })
            .catch((err) => {
              console.error("Failed to exit fullscreen:", err);
            });
        }
      } catch (err) {
        console.error("Failed to exit fullscreen:", err);
      }
    } else {
      setIsFullScreen(true);
    }
  };

  return (
    <div className="layout-body">
      <button
        onClick={() => {
          return !isFullScreen
            ? handleOrientationChange()
            : exitFullScreen("client");
        }}
        id="lock-btn"
      >
        {!isFullScreen ? <ExpandOutlined /> : <CompressOutlined />}
      </button>

  


      <Router>
        <Layout
          style={{ height: "100%", width: "100%", background: "transparent" }}
        >
          <audio id='audio-tag' src={auido}  loop/>
          <GlobalStyles />
          <Content>
            <Switch>
          
              <ProtectedRoute exact path="/setu_game/login" component={Login}   handleOrientationChange={handleOrientationChangeLogin} />
              <ProtectedRoute exact path="/setu_game/signup" component={Signup} />
              <ProtectedRoute
                exact
                path="/setu_game/forgot-password"
                component={ForgotPassword}
              />
              <ProtectedRoute path="/setu_game" component={Dashboard} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state?.SeTu?.auth,
  organisation: state?.SeTu?.organisation,
});
const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
