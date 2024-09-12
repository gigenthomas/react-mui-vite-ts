export interface UserEvent {
    EventId: string,
    EventName: string,
    start: string,
    end: string,
    isAllDay: boolean,
    status: string | null,
    priority: string 
    startFormatted: Date | null,
    endFormatted: Date | null 
  }
  