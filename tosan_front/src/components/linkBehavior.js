import * as React from 'react';
import { Link as RouterLink} from 'react-router-dom';

export const LinkBehavior = React.forwardRef((props, ref) => {
    const { href, ...other } = props;
    if(href.startsWith('&&')){
        return <a href={href.slice(2)} ref={ref} {...other}/>
    }else {
        // Map href (MUI) -> to (react-router)
        return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
    }
});
