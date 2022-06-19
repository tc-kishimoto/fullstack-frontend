import styled from "styled-components";
import React, {
    useState, useEffect, useRef, useCallback,
  } from 'react'

const MeterStyle = styled.div`
    background-color: #15214c;
    color: #fff;
    height: 35px;
    width: 85px;
    opacity: .502;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    line-height: 2.5;
    font-size: 15px;
`

const Bar = styled.div`
    width: 100%;
    background-color: #005bab;
    opacity: .6;
    height: 100px;
    position: absolute;
    text-align: center;
`



function Meter() {

    const [progress, setProgress] = useState(0)

    const handleScroll = useCallback(() => {
        const hiddenHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
        //  スクロール量（px）: D
        const scrollPx = document.documentElement.scrollTop;
        //  スクロール量(%)：E = D / C * 100
        const scrollValue = Math.round((scrollPx / hiddenHeight) * 100);
        // console.log('progress', progress)
        // console.log('scrollValue', scrollValue)
        if (progress < scrollValue) {
            setProgress(scrollValue);
            // console.log('progress-if', progress)
            // console.log('scrollValue', [scrollValue])
    
            // if(this.isLogin) {
            //     clearTimeout(this.timeoutId);
            //     this.timeoutId = setTimeout(this.updateProgress, this.INTERVAL);
            // }
    
        }
    },[])

    useEffect(() => {
        document.addEventListener('scroll', handleScroll, { passive: true })
        return() => document.removeEventListener('scroll', handleScroll, { passive: true })
    }, [])

    return (
        <MeterStyle>
            <Bar></Bar>
            <div>{progress}%</div>
        </MeterStyle>
    );
}

export default Meter;
