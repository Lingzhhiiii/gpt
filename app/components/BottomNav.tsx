import { useDebouncedCallback } from "use-debounce";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  Fragment,
} from "react";

import SendWhiteIcon from "../icons/send-white.svg";
import BrainIcon from "../icons/brain.svg";
import RenameIcon from "../icons/rename.svg";
import ExportIcon from "../icons/share.svg";
import ReturnIcon from "../icons/return.svg";
import CopyIcon from "../icons/copy.svg";
import LoadingIcon from "../icons/three-dots.svg";
import PromptIcon from "../icons/prompt.svg";
import MaskIcon from "../icons/mask.svg";
import MaxIcon from "../icons/max.svg";
import MinIcon from "../icons/min.svg";
import ResetIcon from "../icons/reload.svg";
import BreakIcon from "../icons/break.svg";
import SettingsIcon from "../icons/chat-settings.svg";
import DeleteIcon from "../icons/clear.svg";
import PinIcon from "../icons/pin.svg";
import EditIcon from "../icons/rename.svg";
import ConfirmIcon from "../icons/confirm.svg";
import CancelIcon from "../icons/cancel.svg";

import LightIcon from "../icons/light.svg";
import DarkIcon from "../icons/dark.svg";
import AutoIcon from "../icons/auto.svg";
import BottomIcon from "../icons/bottom.svg";
import StopIcon from "../icons/pause.svg";
import RobotIcon from "../icons/robot.svg";

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

export const BottomNav = () => {
  const chatStore = useChatStore();
  const navigate = useNavigate();

  return (
    <div>
      <BottomNavigation>
        <BottomNavigationAction
          icon={
            <ChatAction
              // onClick={props.showPromptModal}
              onClick={() => {
                navigate(Path.Chat);
              }}
              text={Locale.Chat.InputActions.Settings}
              icon={<SettingsIcon />}
            />
          }
        />
        <BottomNavigationAction
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
          icon={
            <ChatAction
              text={Locale.Chat.InputActions.Clear}
              icon={<BreakIcon />}
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
    </div>
  );
};
