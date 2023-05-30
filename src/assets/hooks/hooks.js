import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  activityCreateApi,
  activityUpdateApi,
  deleteDataApi,
  fetchDataApi,
  loginApi,
  signUpApi,
} from "../api/api";

// //};
const useLogin = () => {
  const queryClient = useQueryClient();
  queryClient.setMutationDefaults("UseLoginApi", {
    mutationFn: ({ email, password }) => loginApi(email, password),
    onMutate: async (variables) => {
      const { onSuccessCb, onErrorCb } = variables;
      return { onSuccessCb, onErrorCb };
    },
    onSuccess: (result, variables, context) => {
      if (context.onSuccessCb) {
        context.onSuccessCb(result);
        console.log(
          "context.onSuccessCb(result);",
          context.onSuccessCb(result)
        );
      }
    },
    onError: (error, variables, context) => {
      if (context.onErrorCb) {
        console.log("onErrorCb", context.onErrorCb(error));
        context.onErrorCb(error);
      }
    },
  });
  return useMutation("UseLoginApi");
};

const useUpadate = () => {
  const queryClient = useQueryClient();
  queryClient.setMutationDefaults("useUpadateApi", {
    mutationFn: ({
      id,
      name,

      eDescription,
      eActivityType,
      eDuration,
      date,
    }) =>
      activityUpdateApi(
        id,
        name,

        eDescription,
        eActivityType,
        eDuration,
        date
      ),
    onMutate: async (variables) => {
      queryClient.invalidateQueries("useFetchDataApi");
      const { onSuccessCb, onErrorCb } = variables;
      return { onSuccessCb, onErrorCb };
    },
    onSuccess: (result, variables, context) => {
      if (context.onSuccessCb) {
        context.onSuccessCb(result);
        console.log(
          "context.onSuccessCb(result);",
          context.onSuccessCb(result)
        );
      }
    },
    onError: (error, variables, context) => {
      if (context.onErrorCb) {
        console.log("onErrorCb", context.onErrorCb(error));
        context.onErrorCb(error);
      }
    },
  });
  return useMutation("useUpadateApi");
};

const useSignUp = () => {
  const queryClient = useQueryClient();
  queryClient.setMutationDefaults("UseSignUpApi", {
    mutationFn: ({ username, email, confirmPassword }) =>
      signUpApi(username, email, confirmPassword),
    //   console.log(sname, email, confirmPassword),
    onMutate: async (variables) => {
      const { onSuccessCb, onErrorCb } = variables;
      return { onSuccessCb, onErrorCb };
    },
    onSuccess: (result, variables, context) => {
      // const { success } = result;
      //   if (!success) {
      //     // API returns status 200 with form errors
      //     // Manual handling with success flag
      //     throw new Error(result);
      //   }
      if (context.onSuccessCb) {
        context.onSuccessCb(result);
      }
    },
    onError: (error, variables, context) => {
      if (context.onErrorCb) {
        context.onErrorCb(error);
      }
    },
  });
  return useMutation("UseSignUpApi");
};

const useFetchData = () => {
  return useQuery(["useFetchDataApi"], () => fetchDataApi(), {
    select: (data) => data,
    // refetchOnMount: true,
    //refetchOnWindowFocus: true,
  });
};

const useActivityCreate = () => {
  const queryClient = useQueryClient();
  queryClient.setMutationDefaults("useActivityCreateApi", {
    mutationFn: ({ name, description, activityType, duration }) =>
      activityCreateApi(name, description, activityType, duration),
    // console.log("sname, email, confirmPassword"),
    onMutate: async (variables) => {
      queryClient.invalidateQueries("useFetchDataApi");
      const { onSuccessCb, onErrorCb } = variables;
      return { onSuccessCb, onErrorCb };
    },
    onSuccess: (result, variables, context) => {
      if (context.onSuccessCb) {
        context.onSuccessCb(result);
      }
    },
    onError: (error, variables, context) => {
      if (context.onErrorCb) {
        context.onErrorCb(error);
      }
    },
  });
  return useMutation("useActivityCreateApi");
};

const useActivityDelete = () => {
  const queryClient = useQueryClient();
  queryClient.setMutationDefaults("useActivityDeleteApi", {
    mutationFn: ({ id }) => deleteDataApi(id),
    //   console.log(sname, email, confirmPassword),
    onMutate: async (variables) => {
      const { onSuccessCb, onErrorCb } = variables;
      return { onSuccessCb, onErrorCb };
    },
    onSuccess: (result, variables, context) => {
      queryClient.invalidateQueries("useFetchDataApi");
      if (context.onSuccessCb) {
        context.onSuccessCb(result);
      }
    },
    onError: (error, variables, context) => {
      if (context.onErrorCb) {
        context.onErrorCb(error);
      }
    },
  });
  return useMutation("useActivityDeleteApi");
};

export {
  useSignUp,
  useLogin,
  useFetchData,
  useActivityCreate,
  useActivityDelete,
  useUpadate,
};
