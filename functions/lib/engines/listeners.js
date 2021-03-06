"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../common/db");
const _ = require("lodash");
const helpers = require("../common/helpers");
const logic = require("./logic");
function onPlayerJoinedRoom(roomId, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        //await player info like name, etc
        return db.update(`rooms/${roomId}/lobby/${uid}`, {
            joinedAt: Date.now(),
        });
    });
}
exports.onPlayerJoinedRoom = onPlayerJoinedRoom;
function onGameStatusUpdate(change, roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (change.before.val() !== 'statusType/lobby' || change.after.val() !== 'statusType/pregame')
            return;
        let rss = yield db.get(`rooms/${roomId}`);
        //prepare role list
        let rolesArr = [];
        for (var id in rss.config.roles) {
            for (var j = 0; j < rss.config.roles[id]; j++) {
                rolesArr.push(id);
            }
        }
        rolesArr = _.shuffle(rolesArr);
        //Finishing player details
        let lobby = rss.lobby;
        let ready = {};
        let counter = 0;
        for (var uid in rss.lobby) {
            lobby[uid].roleId = rolesArr[counter];
            ready[uid] = false;
            counter++;
        }
        return db.update(`rooms/${roomId}`, {
            lobby,
            ready,
            gameState: {
                counter: 0,
                phase: 0,
                dayNum: 1,
                nominate: null,
                veto: 0,
            },
            config: {
                status: 'statusType/game'
            }
        });
    });
}
exports.onGameStatusUpdate = onGameStatusUpdate;
function onPlayerChoiceHandler(choices, roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        let roomSnapshot = yield db.get(`rooms/${roomId}`);
        let playerNum = helpers.getPlayerCount(roomSnapshot.lobby);
        let triggerNum = helpers.getTriggerNum(playerNum);
        let gamePhase = roomSnapshot.gameState.phase;
        let total = Object.keys(choices).length;
        let batch = {};
        if (gamePhase == 0 && total >= triggerNum) {
            batch = logic.onVote(choices, roomSnapshot);
        }
        else if (gamePhase == 1 && total >= playerNum - 1) {
            batch = logic.onTrial(choices, roomSnapshot);
        }
        else if (gamePhase == 2 && total >= playerNum) {
            batch = logic.onNight(choices, roomSnapshot);
        }
        else {
            return;
        }
        return db.update(`rooms/${roomId}`, batch);
    });
}
exports.onPlayerChoiceHandler = onPlayerChoiceHandler;
function onPlayerLoadHandler(loaded, roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        let roomSnapshot = yield db.get(`rooms/${roomId}`);
        let playerNum = helpers.getPlayerCount(roomSnapshot.lobby);
        if (Object.keys(loaded).length < playerNum)
            return;
        let ready = {};
        for (var uid in roomSnapshot.ready) {
            ready[uid] = false;
        }
        return db.update(`rooms/${roomId}`, {
            ready,
            loaded: null,
            choice: null,
        });
    });
}
exports.onPlayerLoadHandler = onPlayerLoadHandler;
//# sourceMappingURL=listeners.js.map