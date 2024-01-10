export  interface NoteType {
    _id: string;
    title: string;
    body: {
      text: string;
      isChecked: boolean;
    }[];
    isCheckboxes: boolean;
    isPinned?: boolean;
  }
  