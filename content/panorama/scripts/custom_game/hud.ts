$.Msg("Hud panorama loaded");

GameEvents.Subscribe("my_custom_event", event => {
    $.Msg("Received custom event", event);
});

GameEvents.SendCustomGameEventToServer<{}>("ui_loaded", {});
