import React, { useState, useEffect } from 'react';
import { Icon } from 'idesign-react';
import _ from 'lodash';
import axios from 'axios';
import { message } from 'antd';

const copyText = (text: string) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.pointerEvents = 'none';
        textarea.style.top = '0px';
        textarea.value = text;
        textarea.select();
        document.execCommand('copy', true);
        document.body.removeChild(textarea);
    }
}

const App = () => {
    const [iconArr, setIconArr] = useState<{ name: string; icon_id: string }[]>([]);
    const api =
        'https://at.alicdn.com/t/font_3161433_glke53nnqws.json?spm=a313x.7781069.1998910419.80&file=font_3161433_glke53nnqws.json';

    useEffect(() => {
        let isUnmounted = false;
        const abortController = new window.AbortController();
        axios
            .get(api)
            .then((res) => setIconArr(res.data.glyphs))
            .finally(() => { });
        return () => {
            isUnmounted = true;
            abortController.abort;
        };
    }, []);

    const sortedIconArr = _.sortBy(iconArr, (item) => item.name);

    const handleCopyName = (iconName: string) => {
        copyText(iconName)
        message.success(`${iconName} 复制成功`)
    };

    const handleCopyIconCode = (e: React.MouseEvent, iconName: string) => {
        e.preventDefault()
        copyText(`<${iconName} />`);
        message.success(`<${iconName} /> 复制成功`)
    }

    return (
        <div className="i-design-demo-icon-list">
            {sortedIconArr.map((item) => {
                return (
                    <div
                        className='i-design-demo-icon-item'
                        key={item.icon_id}
                        onClick={() => handleCopyName(item.name)}
                        onContextMenu={(e) => handleCopyIconCode(e, item.name)}
                    >
                        <Icon name={item.name} size={32} />
                        <div>{item.name}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default App;