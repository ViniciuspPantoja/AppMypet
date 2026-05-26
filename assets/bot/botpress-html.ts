import {
    BOTPRESS_BOT_SCRIPT_URL,
    BOTPRESS_INJECT_SCRIPT_URL,
} from "./botpress-config";
import { createBotpressHtml } from "./botpress-web.logic";
import { BOTPRESS_WEB_CSS } from "./botpress-web.styles";

export const BOTPRESS_HTML = createBotpressHtml({
  css: BOTPRESS_WEB_CSS,
  injectScriptUrl: BOTPRESS_INJECT_SCRIPT_URL,
  botScriptUrl: BOTPRESS_BOT_SCRIPT_URL,
});
