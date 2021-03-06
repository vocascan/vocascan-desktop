import React, { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../Components/Button/Button.jsx";
import Switch from "../../Components/Form/Switch/Switch.jsx";
import LanguageSelector from "../../Components/LanguageSelector/LanguageSelector.jsx";

import { openGuide } from "../../redux/Actions/login.js";
import { setMenuStyle } from "../../redux/Actions/setting.js";
import { getInfo } from "../../utils/api.js";

import { version as desktopVersion } from "../../../package.json";

import "./Settings.scss";

const Settings = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const menuStyle = useSelector((state) => state.setting.menuStyle);

  const [serverInfo, setServerInfo] = useState(null);

  const onChangeMenu = useCallback(() => {
    dispatch(
      setMenuStyle({ menuStyle: menuStyle === "default" ? "fancy" : "default" })
    );
  }, [dispatch, menuStyle]);

  const reopenGuide = useCallback(() => {
    dispatch(openGuide());
  }, [dispatch]);

  useEffect(() => {
    getInfo()
      .then((res) => {
        setServerInfo(res?.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="settings-wrapper">
      <h1 className="heading">{t("screens.settings.title")}</h1>
      <Switch
        switcher
        label={t("screens.settings.menu.label")}
        optionLeft={t("screens.settings.menu.optionLeft")}
        optionRight={t("screens.settings.menu.optionRight")}
        onChange={onChangeMenu}
        checked={menuStyle !== "default"}
      />

      <LanguageSelector />

      <div className="settings-guide">
        <h3>{t("screens.settings.guide.title")}</h3>
        <Button block uppercase onClick={reopenGuide}>
          {t("screens.settings.guide.button")}
        </Button>
      </div>

      <h3>
        {t("screens.settings.desktopVersion")} v{desktopVersion}
      </h3>
      {serverInfo && (
        <h3>
          {t("screens.settings.serverVersion")} v{serverInfo.version}
          {serverInfo.commitRef ? ` (${serverInfo.commitRef})` : ""}
        </h3>
      )}
    </div>
  );
};

export default Settings;
