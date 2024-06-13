import { Modal } from 'antd';
import React from 'react'
import titleBG from "../../assets/Empty Choice Box.png";
import wrongChoice from "../../assets/Negative path.png";
import correctChoice from "../../assets/Positive path.png";
import { CloseCircleOutlined } from '@ant-design/icons';


function QuestionAnswersModal({ isOpenModal, setIsOpenModal, choiceIndex }) {
    const title = ["Ohh, This is the wrong choice.", "That's the right choice.", "That's the intresting choice.", "That's the good choice"]
    return (
        <Modal
            visible={isOpenModal}
            onCancel={() => setIsOpenModal(false)}
            footer={null}
            className='token-model'
            width={1000}
            style={{ height: "90dvh" }}
            centered={true}
            closeIcon={false}
            maskClosable={false}
        >
            <div className="r-c-c-c parent-qa">
                <div className='r-c-c' style={{}} >
                    <div className="letsPlay-intro modal-text" style={{}}>
                        {title[choiceIndex]}
                    </div>
                </div>
                <div className='modal-close r-c-fe' ><CloseCircleOutlined onClick={() => setIsOpenModal(false)} style={{ fontSize: 22 }} /></div>
                <div className="r-c-c modal-img " ><img className='full-img' src={titleBG} alt="lets play" /> </div>
                <div className="r-c-c modal-img-1" ><img className='full-img' src={choiceIndex == 0 ? wrongChoice : correctChoice} alt="lets play" /></div>
            </div>
        </Modal>
    );
}

export default QuestionAnswersModal
