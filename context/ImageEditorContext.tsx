import { createContext, useContext, useReducer } from "react";

/* type ImageEdited = {
  arrayId: number;
  imageData: any;
}; */

type State = {
  imagesEdited?: any[];
  imageSelected: number;
};

const initialValues: State = {
  imagesEdited: [],
  imageSelected: 0,
};

const actions = {
  saveImageEdited: (state: State, imageEdited: any): State => {
    let { imagesEdited: images } = state;
    const { arrayId, imageData } = imageEdited;
    const imageIds = images?.map((element) => element.arrayId);

    if (!imageIds?.includes(arrayId)) {
      images?.push(imageEdited);
    } else {
      images = images?.map((element) => {
        if (element.arrayId === arrayId) {
          element.imageData = imageData;
        }
        return element;
      });
    }

    return { ...state, imagesEdited: images };
  },
  imageSelected: (state: State, imageSelected: number): State => {
    return { ...state, imageSelected };
  },
};

type OAction = typeof actions;
type TAction = {
  [K in keyof OAction]: { type: K; payload?: Parameters<OAction[K]>[1] };
};
type Action = TAction[keyof TAction];
type Dispatch = (action: Action) => void;

type ImageEditorContextProps = {
  state: State;
  dispatch: Dispatch;
};

type ImageEditorProviderProps = { children: React.ReactNode };

const ImageEditorContext = createContext<ImageEditorContextProps | undefined>(
  undefined
);

const ImageEditorReducer = (state: State, action: Action): State => {
  if (action.type in actions) {
    return actions[action.type](state, action.payload as any);
  }
  return state;
};

const ImageEditorProvider = ({ children }: ImageEditorProviderProps) => {
  const [state, dispatch] = useReducer(ImageEditorReducer, initialValues);
  const value = { state, dispatch };

  return (
    <ImageEditorContext.Provider value={value}>
      {children}
    </ImageEditorContext.Provider>
  );
};

const useImageEditorContext = (): ImageEditorContextProps => {
  const context = useContext(ImageEditorContext);
  if (!context) {
    throw new Error("Error initializing Image Editor Context!");
  }
  return context;
};

export { ImageEditorProvider, useImageEditorContext };
