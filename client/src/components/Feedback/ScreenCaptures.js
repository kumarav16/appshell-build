import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { Grid } from "@material-ui/core";
import "./SpecificSnapshot.css";
import { withTranslation } from 'react-i18next';

const ScreenCaptures = ({ asd, onEndCapture, children,t }) => {
  const [on, setOn] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [crossHairsTop, setCrossHairsTop] = useState(0);
  const [crossHairsLeft, setCrossHairsLeft] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [borderWidth, setBorderWidth] = useState(0);
  const [cropPositionTop, setCropPositionTop] = useState(0);
  const [cropPositionLeft, setCropPositionLeft] = useState(0);
  const [cropWidth, setCropWidth] = useState(0);
  const [cropHeigth, setCropHeigth] = useState(0);
  

  const handleWindowResize = () => {
    setWindowWidth(
      window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    );
    setWindowHeight(
      window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
    );
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const handStartCapture = () => setOn(true);
/* istanbul ignore next */
  const handleMouseMove = (e) => {
    setCropPositionTop(startY);
    setCropPositionLeft(startX);
    setEndX(e.clientX);
    setEndY(e.clientY);
    const isStartTop = endY >= startY;
    const isStartBottom = endY <= startY;
    const isStartLeft = endX >= startX;
    const isStartRight = endX <= startX;
    const isStartTopLeft = isStartTop && isStartLeft;
    const isStartTopRight = isStartTop && isStartRight;
    const isStartBottomLeft = isStartBottom && isStartLeft;
    const isStartBottomRight = isStartBottom && isStartRight;
    let newBorderWidth = borderWidth;
    setCropWidth(0);
    setCropHeigth(0);

    if (isMouseDown) {
      if (isStartTopLeft) {
        newBorderWidth = `${startY}px ${windowWidth - endX}px ${
          windowHeight - endY
        }px ${startX}px`;
        setCropWidth(endX - startX);
        setCropHeigth(endY - startY);
        // setCropWidth(endX);
        // setCropHeigth(endY);
      }

      if (isStartTopRight) {
        newBorderWidth = `${startY}px ${windowWidth - startX}px ${
          windowHeight - endY
        }px ${endX}px`;
        setCropWidth(startX - endX);
        setCropHeigth(endY - startY);
        setCropPositionLeft(endX);
      }

      if (isStartBottomLeft) {
        newBorderWidth = `${endY}px ${windowWidth - endX}px ${
          windowHeight - startY
        }px ${startX}px`;
        setCropWidth(endX - startX);
        setCropHeigth(startY - endY);
        setCropPositionTop(endY);
      }

      if (isStartBottomRight) {
        newBorderWidth = `${endY}px ${windowWidth - startX}px ${
          windowHeight - startY
        }px ${endX}px`;
        setCropWidth(startX - endX);
        setCropHeigth(startY - endY);
        setCropPositionLeft(endX);
        setCropPositionTop(endY);
      }
    }
    setCrossHairsTop(e.clientY);
    setCrossHairsLeft(e.clientX);
    setBorderWidth(newBorderWidth);
  };

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setStartY(e.clientY);
    setCropPositionTop(startY);
    setCropPositionLeft(startX);
    setIsMouseDown(true);
    setBorderWidth(
      (prevState) => `${prevState.windowWidth}px ${prevState.windowHeight}px`
    );
  };

  const handleMouseUp = (e) => {
    handleClickTakeScreenShot();
    setOn(false);
    setIsMouseDown(false);
    setBorderWidth(0);
  };
/* istanbul ignore next */
  const handleClickTakeScreenShot = () => { 
    const body = document.querySelector(".main-app iframe").contentWindow.document.body;
    html2canvas(body,{
      foreignObjectRendering: true
    })
      .then((canvas) => {
        let croppedCanvas = cropCanvas(canvas);
        displayScreenShot(croppedCanvas);
      });
    setCrossHairsTop(0);
    setCrossHairsLeft(0);
  };

  const displayScreenShot = (croppedCanvas) => {
    if(cropWidth > 1 && cropHeigth > 1) {
      onEndCapture(croppedCanvas.toDataURL());
    } else {
          const list = document.getElementById("completesnapshot");
          while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
      } 
    }
  }


  const cropCanvas = (canvas) => {
    let croppedCanvas = document.createElement("canvas");
      let croppedCanvasContext = croppedCanvas.getContext("2d");

      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeigth;

    //Getting left and top measurements dynamically
    let offsetLeft = document.getElementById('iframeWrapper').offsetLeft;
    let offsetTop = document.getElementById('iframeWrapper').offsetTop;

      croppedCanvasContext.drawImage(
        canvas,
        cropPositionLeft - offsetLeft,
        cropPositionTop - offsetTop,
        cropWidth,
        cropHeigth,
        0,
        0,
        cropWidth,
        cropHeigth
      );
      return croppedCanvas;
  }

  const renderChild = () => {
    const props = {
      asd: handStartCapture
    };
/* istanbul ignore else */
    if (typeof children === "function") return children(props);

    return children;
  };

  if (!on) return renderChild();

  return (
    <Grid
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {renderChild()}
      <Grid
        className={`overlay ${isMouseDown && "highlighting"}`}
        style={{ borderWidth }}
        id="ScreenCaptureWrap"
      />
      <div
          className="crosshairs"
          style={{ left: crossHairsLeft + "px", top: crossHairsTop + "px" }}
      >
        <div className="crosshairsTooltiptext">{t("FeedbackDragToolTip")}</div>
      </div>
    </Grid>
  );
};

export default withTranslation()(ScreenCaptures);

