import React, { useEffect } from 'react';

const UsePageTitle = (title) => {
    useEffect(() => {
        document.title = title ? `read&digest| ${title}` : "read&digest";
    }, [title]);
};

export default UsePageTitle;