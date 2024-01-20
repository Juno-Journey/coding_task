import React from 'react';
import {
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  InfiniteData,
  QueryFunctionContext,
} from 'react-query';

import { Note } from '../API/Types/Note';
import Notes from '../API/Notes';

interface NotesContextType {
  notes?: InfiniteData<Note[]> | undefined;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  hasNextPage: boolean | undefined;
  upsertNote: (variables: NoteMutationVariables) => void;
  currentNote: Note;
  setCurrentNote: React.Dispatch<React.SetStateAction<Note>>;
}

interface NotesQueryKey {
  search: string;
}

interface NoteMutationVariables {
  id: string;
  note: Partial<Note>;
}

export const NotesContext = React.createContext<NotesContextType | undefined>(undefined);

const PAGE_LIMIT = 15;
const NOTES_KEY = 'notes';

const fetchNotes = async (context: QueryFunctionContext<[string, NotesQueryKey]>) => {
  const { pageParam = 0, queryKey } = context;
  const [_key, { search }] = queryKey;
  const limit = PAGE_LIMIT;
  const skip = pageParam * PAGE_LIMIT;
  return Notes.search({ search, limit, skip });
};

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentNote, setCurrentNote] = React.useState<Note>({} as Note);

  React.useEffect(() => {
    queryClient.refetchQueries([NOTES_KEY, { search: searchTerm }]);
  }, [searchTerm, queryClient]);

  const {
    data: notes,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
  } = useInfiniteQuery([NOTES_KEY, { search: searchTerm }], fetchNotes, {
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage.length === PAGE_LIMIT;
      if (morePagesExist) {
        return allPages.length;
      } else {
        return undefined;
      }
    },
    enabled: searchTerm.length === 0 || searchTerm.length > 2,
  });

  const upsertNoteMutation = useMutation(
    ({ id, note }: NoteMutationVariables) => Notes.upsertNote(id, note),
    {
      onMutate: async ({ id, note }) => {
        console.log({ id, note });

        await queryClient.cancelQueries([NOTES_KEY, { search: searchTerm }]);

        const currentData = queryClient.getQueryData<{ pages: Note[][] }>([
          NOTES_KEY,
          { search: searchTerm },
        ]);

        if (currentData) {
          const updatedPages = currentData.pages.map((page) =>
            page.map((item) => (item._id === id ? { ...item, ...note } : item))
          );

          console.log({ updatedPages });

          queryClient.setQueryData([NOTES_KEY, { search: searchTerm }], {
            ...currentData,
            pages: updatedPages,
          });

          return { previousPages: currentData.pages };
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries<Note[]>(NOTES_KEY);
      },
    }
  );

  return (
    <NotesContext.Provider
      value={{
        notes,
        searchTerm,
        isFetchingNextPage,
        hasNextPage,
        isLoading,
        currentNote,
        setCurrentNote,
        setSearchTerm,
        fetchNextPage,
        upsertNote: upsertNoteMutation.mutate,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
