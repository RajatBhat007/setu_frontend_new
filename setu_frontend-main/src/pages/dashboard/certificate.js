import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import downloadIc from "../../assets/certificate/download-icon.svg";
import tgcIc from "../../assets/certificate/new logo system TGC _ final_high resolution (1) 2.svg";
import certificateIc from "../../assets/certificate/Certificate.svg";
import { Button, Modal } from 'antd';
import letsPlayFrame from '../../assets/magnus-intro/letsPlay-frame.svg';
import { setStep } from '../../reduxStore/actions/action';
function Certificate({ userDetails,setStep }) {
    const certificateRef = useRef();
    const [isDownloaded, setIsDownloaded] = useState(false);
    const Downloaded =()=>{
        return(
            <>
            <Modal open={isDownloaded} onCancel={()=>{setIsDownloaded(false)}}
            footer={null}
            closeIcon={false}
            className='token-model'
            maskClosable={false}
        
            >
            <div className="r-c-c" style={{width:"100%", height:"100dvh"}}>
          <div className='r-c-c' style={{ width:"100%", height:"100%"}} ><img src={letsPlayFrame} className='full-img' /></div>
          <div className='r-c-c-c' style={{position:"absolute"}}>
          <div style={{fontSize:30, fontWeight:"bolder", width:"70%",textAlign:"center"}} >Certificate successfully downloaded</div>
          <div className='r-c-c play-btn m-t-10'><Button onClick={()=>{setStep(7)}} >OK</Button></div>
          </div>
        </div>
            </Modal>
            </>
        )
    }
    const downloadPDF = () => {
        const input = certificateRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = canvas.width / 2;  // We divide by 2 because we scaled the canvas by 2
            const pdfHeight = canvas.height / 2; // We divide by 2 because we scaled the canvas by 2

            const pdf = new jsPDF('landscape', undefined, [pdfWidth, pdfHeight]);
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('certificate.pdf');

            setIsDownloaded(true);
        });
    };

    return (
        <div className='r-c-c-c' style={{ width: "100%", height: "100%" }}>
            <div className="cert-title" style={{}}>
                Congratulations! Here is your certificate of achievement
            </div>
            <div className="cert-download-ic" style={{}} onClick={downloadPDF}>
                <img className='full-img' src={downloadIc} alt="Download" />
            </div>
            <div ref={certificateRef} className='parent-certificate r-c-c-c' style={{}}>
                <div className="cert-logo" style={{}}>
                    <img className='full-img' src={tgcIc} alt="Logo" />
                </div>
                <div className="cert-text" style={{}}>
                    This certifies that <span>[{userDetails?.name}]</span> has successfully completed values and behaviors program!
                </div>
                <div className='cert-img' style={{}}>
                    <img className='full-img' src={certificateIc} alt="Certificate" />
                </div>
            </div>

            {isDownloaded && <Downloaded />}
        </div>
    );
}

const mapStateToProps = state => {
    const { userDetails } = state?.SeTu;
    return { userDetails };
};
const mapDispatchToProps = dispatch => ({
    setStep: (val) => dispatch(setStep(val))

})
export default connect(mapStateToProps,mapDispatchToProps)(Certificate);
