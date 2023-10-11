import { useDebouncedCallback } from "use-debounce";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  Fragment,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Image from "next/image";
import maskIcon1 from "../icons/mask1.png";
import maskIcon0 from "../icons/mask0.png";
import clearIcon0 from "../icons/clear0.png";
import clearIcon1 from "../icons/clear1.png";
import chatIcon0 from "../icons/chat0.png";
import chatIcon1 from "../icons/chat1.png";

import BreakIcon from "../icons/break.svg";
import SettingsIcon from "../icons/chat-settings.svg";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import {
  ChatMessage,
  SubmitKey,
  useChatStore,
  BOT_HELLO,
  createMessage,
  useAccessStore,
  Theme,
  useAppConfig,
  DEFAULT_TOPIC,
  ModelType,
} from "../store";

import {
  copyToClipboard,
  selectOrCopy,
  autoGrowTextArea,
  useMobileScreen,
} from "../utils";

import dynamic from "next/dynamic";

import { ChatControllerPool } from "../client/controller";
import { Prompt, usePromptStore } from "../store/prompt";
import Locale from "../locales";

import { IconButton } from "./button";

import { useLocation, useNavigate } from "react-router-dom";
import {
  CHAT_PAGE_SIZE,
  LAST_INPUT_KEY,
  MAX_RENDER_MSG_COUNT,
  Path,
  REQUEST_TIMEOUT_MS,
  UNFINISHED_INPUT,
} from "../constant";

import { ChatAction } from "./chat";
import { nightTheme, lightTheme } from "./muiTheme";

export const BottomNav = (props: { state: string }) => {
  const chatStore = useChatStore();
  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState(props.state); // 初始选中的值

  const config = useAppConfig();

  const MaskIcon = () => {
    return (
      <div>
        <Image
          src={
            selectedValue === "mask" && config.theme !== "dark"
              ? maskIcon1
              : maskIcon0
          }
          alt="mask"
          height="22"
          width="22"
        />
      </div>
    );
  };

  const ChatIcon = () => {
    return (
      <div>
        <Image
          src={
            selectedValue === "chat" && config.theme !== "dark"
              ? chatIcon1
              : chatIcon0
          }
          height="22"
          width="22"
          alt="chat"
        />
      </div>
    );
  };

  const ClearIcon = () => {
    return (
      <div>
        <Image src={clearIcon0} alt="clear" height="22" width="22" />
      </div>
    );
  };

  return (
    <div>
      <ThemeProvider theme={config.theme === "dark" ? nightTheme : lightTheme}>
        <BottomNavigation>
          <BottomNavigationAction
            value="chat"
            icon={
              <ChatAction
                // onClick={props.showPromptModal}
                onClick={() => {
                  navigate(Path.Chat);
                }}
                text={Locale.Chat.InputActions.Settings}
                icon={<ChatIcon />}
              />
            }
          />
          <BottomNavigationAction
            value="mask"
            icon={
              <ChatAction
                text={Locale.Chat.InputActions.Masks}
                icon={<MaskIcon />}
                onClick={() => {
                  navigate(Path.Masks);
                }}
              />
            }
          />
          <BottomNavigationAction
            value="clear"
            icon={
              <ChatAction
                text={Locale.Chat.InputActions.Clear}
                icon={<ClearIcon />}
                onClick={() => {
                  chatStore.updateCurrentSession((session) => {
                    if (session.clearContextIndex === session.messages.length) {
                      session.clearContextIndex = undefined;
                    } else {
                      session.clearContextIndex = session.messages.length;
                      session.memoryPrompt = ""; // will clear memory
                    }
                  });
                }}
              />
            }
          />
        </BottomNavigation>
      </ThemeProvider>
    </div>
  );
};
