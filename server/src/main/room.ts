export type Room = {
    id: string;
    playerOne: Player;
    playerTwo: Player;
};

export type Player = {
    id: string;
    ready: boolean;
};

//getter
export const activeRooms: Room[] = [];

export const createRoom = (roomId: string, userId: string) => {
    activeRooms.push({
        id: roomId,
        playerOne: {id: userId, ready: false},
        playerTwo: {id: "", ready: false},
    });
};

export const joinRoom = (roomId: string, userId: string): boolean => {
    const room = activeRooms.find((r) => r.id === roomId);
    if (room) {
        room.playerTwo.id = userId;
        room.playerTwo.ready = false;
        return true;
    }

    return false;
};

export const roomExists = (roomId: string): boolean => {
    return activeRooms.some((r) => r.id === roomId);
};

export const getRoom = (roomId: string): Room => {
    return activeRooms.find((r) => r.id === roomId);
};
