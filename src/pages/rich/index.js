import React from 'react'
import { Card, Button, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

export default class RichText extends React.Component{
    state = {
        editorState: '',
        isShowRich: false
    }
    onEditorStateChange = (editorState)=> {
        this.setState({
            editorState
        })
    }
    onContentStateChange = (contentState) => {
        this.setState({
            contentState
        })
    }
    handleClear = ()=> {
        this.setState({
            editorState: ''
        })
    }
    handleGetRich = ()=> {
        this.setState({
            isShowRich: true
        })
    }
    render(){
        const { editorState } = this.state;
        return(<div>
            <Card>
                <Button type="primary" onClick={this.handleClear}>清空内容</Button> 
                <Button type="primary" onClick={this.handleGetRich}>获取富文本（Html）内容</Button>  
            </Card>
            <Card title="富文本编辑器">
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                    onContentStateChange={this.onContentStateChange}
                />
            </Card>
            <Modal
                title="富文本"
                visible={this.state.isShowRich}
                onCancel={()=>{
                    this.setState({
                        isShowRich: false
                    })
                }}
                footer={null}
            >
                {draftToHtml(this.state.contentState)}
            </Modal>
            </div>)
    }
}