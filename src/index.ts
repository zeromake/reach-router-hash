import {
    Link,
    Location,
    LocationProvider,
    Match,
    Redirect,
    Router,
    ServerLocation,
    createHistory,
    createMemorySource,
    isRedirect,
    // navigate,
    redirectTo,
    globalHistory,
    //
    History,
    LinkProps,
} from "@reach/router";
import { forwardRef, createElement as h, Ref } from "react";

import createHashSource from "hash-source";

const hashSource = createHashSource();
const hashHistory = createHistory(hashSource as any);

(LocationProvider as any as {
    defaultProps: {
        history: History,
    }
}).defaultProps.history = hashHistory;
const _HashLink = <T>(props: LinkProps<any>, ref?: Ref<HTMLLinkElement>) => {
    return h(Link, Object.assign({}, props, {
        ref: ref as any,
        to: `/#${props.to}`,
    }));
};

const HashLink = forwardRef<HTMLLinkElement, LinkProps<any>>(_HashLink as any);
const navigate = hashHistory.navigate;
export {
    HashLink as Link,
    Location,
    LocationProvider,
    Match,
    Redirect,
    Router,
    ServerLocation,
    createHistory,
    createMemorySource,
    isRedirect,
    navigate,
    redirectTo,
    globalHistory,
    hashHistory,
}
