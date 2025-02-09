import io, {Socket} from "socket.io-client";

const URL = process.env.BACKEND_FQDN;
const FALLBACK_TIMEOUT = 5000;

const COMMANDS = {
    createParty: "createParty",
    partyCreated: "partyCreated",
    joinParty: "joinParty",
    joinedParty: "joinedParty",
};

type RoomCreationResponse = {
    roomId: string;
    userId: string;
};

export default class StartPartyService {
    private socket: Socket;

    constructor() {
        this.socket = io(URL);
    }

    async createParty(): Promise<RoomCreationResponse> {
        this.socket.emit(COMMANDS.createParty);
        return new Promise((resolve) =>
            this.socket.on(
                COMMANDS.partyCreated,
                (roomId: string, userId: string) => {
                    resolve({roomId, userId});
                },
            ),
        );
    }

    async joinParty(name: string): Promise<RoomCreationResponse> {
        this.socket.emit(COMMANDS.joinParty, name);
        return new Promise((resolve) => {
            const fallBack = setTimeout(
                () => resolve({roomId: "", userId: ""}),
                FALLBACK_TIMEOUT,
            );
            this.socket.on(
                COMMANDS.joinedParty,
                (roomId: string, userId: string) => {
                    clearTimeout(fallBack);
                    resolve({roomId, userId});
                },
            );
        });
    }

    getSocket() {
        return this.socket;
    }
}
