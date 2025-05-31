let socket: WebSocket | null = null;

export const ws = {
  connect() {
    if (!socket) {
      socket = new WebSocket("ws://localhost:8765");

      socket.onopen = () => {
        console.log("WebSocket connected");
      };

      socket.onclose = () => {
        console.log("WebSocket disconnected");
        socket = null;
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }
    return socket;
  },

  disconnect() {
    if (socket) {
      socket.close();
      socket = null;
    }
  },

  on(event: string, callback: (data: string) => void) {
    if (!socket) return;

    const handler = (e: MessageEvent) => {
      callback(e.data);
    };

    socket.addEventListener("message", handler);
    return () => socket?.removeEventListener("message", handler);
  },

  emit(event: string, data: unknown) {
    if (!socket) return;
    socket.send(JSON.stringify({ event, data }));
  },
};
