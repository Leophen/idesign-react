import React, { useState, useMemo, useEffect } from 'react';
import {
    LiveProvider,
    LiveEditor,
    LiveError,
    LivePreview,
} from 'react-live';
import "@arco-design/web-react/dist/css/arco.css";
import './index.scss';
import { Collapse, message } from 'antd';
import { CaretUpOutlined, ReloadOutlined } from '@ant-design/icons';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import classNames from 'classnames';

interface PlaygroundWrapperType {
    /**
     * 代码
     */
    children: string
    /**
     * 代码类型
     */
    metastring: string
}

export default function PlaygroundWrapper(props: PlaygroundWrapperType) {
    const {
        children,
        metastring
    } = props;

    const isUnfoldMode = useMemo(() => metastring.includes('unfold'), [metastring]);

    const isWhiteBg = useMemo(() => metastring.includes('fff'), [metastring]);
    const isWhiteBgX = useMemo(() => metastring.includes('fffx'), [metastring]);

    const isPureDemo = useMemo(() => metastring.includes('demo'), [metastring]);

    const [currentCode, setCurrentCode] = useState(children);
    const handleChangeCode = (code: string) => setCurrentCode(code)
    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(currentCode);
            message.success('复制成功');
        }
    }

    const [initActiveKey, setInitActiveKey] = useState(['']);
    const [refreshKey, setRefreshKey] = useState(0);
    const handleResetCode = () => {
        setInitActiveKey([...'1'])
        setRefreshKey(refreshKey + 1)
        setCurrentCode(children)
    }

    // rc-resize-observer 警告修复
    const useBeforeRender = (callback: any, deps: any) => {
        const [isRun, setIsRun] = useState(false);

        if (!isRun) {
            callback();
            setIsRun(true);
        }

        useEffect(() => () => setIsRun(false), deps);
    };
    if (metastring.includes('fix1') && ExecutionEnvironment.canUseDOM) {
        useBeforeRender(() => {
            window.addEventListener("error", (e) => {
                if (e) {
                    const resizeObserverErrDiv = document.getElementById(
                        "webpack-dev-server-client-overlay-div",
                    );
                    const resizeObserverErr = document.getElementById(
                        "webpack-dev-server-client-overlay",
                    );
                    if (resizeObserverErr)
                        resizeObserverErr.className = "hide-resize-observer";
                    if (resizeObserverErrDiv)
                        resizeObserverErrDiv.className = "hide-resize-observer";
                }
            });
        }, []);
    }

    return (
        <div
            className={classNames('rl-code-playground', {
                '-demo': isPureDemo
            })}
        >
            <LiveProvider
                code={currentCode.replace(/\n$/, '')}
                {...props}
            >
                <Collapse
                    items={[
                        {
                            key: '1',
                            label: (
                                <section
                                    className={classNames('rl-code-display', {
                                        '-whiteBg': isWhiteBg,
                                        '-whiteBgX': isWhiteBgX,
                                    })}
                                >
                                    <LivePreview key={refreshKey} />
                                    <LiveError />
                                </section>
                            ),
                            children: isPureDemo ? (<></>) : (
                                <div className="rl-code-editor">
                                    <LiveEditor onChange={handleChangeCode} />
                                    <section className='rl-code-editor-btn-group'>
                                        <div className='rl-code-editor-btn' onClick={handleResetCode}>
                                            <ReloadOutlined />
                                        </div>
                                        <div className='rl-code-editor-btn' onClick={handleCopy}>复制代码</div>
                                    </section>
                                </div>
                            )
                        }
                    ]}
                    defaultActiveKey={isUnfoldMode ? ['1'] : initActiveKey}
                    collapsible="icon"
                    expandIcon={({ isActive }) => isPureDemo ? (<></>) : (
                        <section className='rl-code-handle-bar'>
                            <CaretUpOutlined style={{ transform: isActive ? 'rotateX(0deg)' : 'rotateX(180deg)' }} />
                            <span className='rl-code-handle-txt'>{!isActive ? '展开代码' : '收起代码'}</span>
                        </section>
                    )}
                />
            </LiveProvider>
        </div>
    );
}
