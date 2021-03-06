// @flow
import uuid from 'uuid/v1';

import { loadAllProjectDependencies } from '../services/read-from-disk.service';

import type {
  Project,
  ProjectsMap,
  Task,
  Dependency,
  QueuedDependency,
} from '../types';

//
//
// Action Types
// TODO: Do this with Flow
// https://flow.org/en/docs/react/redux/
//
export const REFRESH_PROJECTS_START = 'REFRESH_PROJECTS_START';
export const REFRESH_PROJECTS_ERROR = 'REFRESH_PROJECTS_ERROR';
export const REFRESH_PROJECTS_FINISH = 'REFRESH_PROJECTS_FINISH';
export const CREATE_NEW_PROJECT_START = 'CREATE_NEW_PROJECT_START';
export const CREATE_NEW_PROJECT_CANCEL = 'CREATE_NEW_PROJECT_CANCEL';
export const CREATE_NEW_PROJECT_FINISH = 'CREATE_NEW_PROJECT_FINISH';
export const ADD_PROJECT = 'ADD_PROJECT';
export const HIDE_MODAL = 'HIDE_MODAL';
export const DISMISS_SIDEBAR_INTRO = 'DISMISS_SIDEBAR_INTRO';
export const SELECT_PROJECT = 'SELECT_PROJECT';
export const RUN_TASK = 'RUN_TASK';
export const ATTACH_TASK_METADATA = 'ATTACH_TASK_METADATA';
export const ABORT_TASK = 'ABORT_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const RECEIVE_DATA_FROM_TASK_EXECUTION =
  'RECEIVE_DATA_FROM_TASK_EXECUTION';
export const LAUNCH_DEV_SERVER = 'LAUNCH_DEV_SERVER';
export const CLEAR_CONSOLE = 'CLEAR_CONSOLE';
export const LOAD_DEPENDENCY_INFO_FROM_DISK = 'LOAD_DEPENDENCY_INFO_FROM_DISK';
export const ADD_DEPENDENCY = 'ADD_DEPENDENCY';
export const UPDATE_DEPENDENCY = 'UPDATE_DEPENDENCY';
export const DELETE_DEPENDENCY = 'DELETE_DEPENDENCY';
export const INSTALL_DEPENDENCIES_START = 'INSTALL_DEPENDENCIES_START';
export const INSTALL_DEPENDENCIES_ERROR = 'INSTALL_DEPENDENCIES_ERROR';
export const INSTALL_DEPENDENCIES_FINISH = 'INSTALL_DEPENDENCIES_FINISH';
export const UNINSTALL_DEPENDENCIES_START = 'UNINSTALL_DEPENDENCIES_START';
export const UNINSTALL_DEPENDENCIES_ERROR = 'UNINSTALL_DEPENDENCIES_ERROR';
export const UNINSTALL_DEPENDENCIES_FINISH = 'UNINSTALL_DEPENDENCIES_FINISH';
export const QUEUE_DEPENDENCY_INSTALL = 'QUEUE_DEPENDENCY_INSTALL';
export const QUEUE_DEPENDENCY_UNINSTALL = 'QUEUE_DEPENDENCY_UNINSTALL';
export const START_NEXT_ACTION_IN_QUEUE = 'START_NEXT_ACTION_IN_QUEUE';
export const SHOW_IMPORT_EXISTING_PROJECT_PROMPT =
  'SHOW_IMPORT_EXISTING_PROJECT_PROMPT';
export const IMPORT_EXISTING_PROJECT_START = 'IMPORT_EXISTING_PROJECT_START';
export const IMPORT_EXISTING_PROJECT_ERROR = 'IMPORT_EXISTING_PROJECT_ERROR';
export const IMPORT_EXISTING_PROJECT_FINISH = 'IMPORT_EXISTING_PROJECT_FINISH';
export const SHOW_DELETE_PROJECT_PROMPT = 'SHOW_DELETE_PROJECT_PROMPT';
export const FINISH_DELETING_PROJECT = 'FINISH_DELETING_PROJECT';
export const SHOW_RESET_STATE_PROMPT = 'SHOW_RESET_STATE_PROMPT';
export const RESET_ALL_STATE = 'RESET_ALL_STATE';

//
//
// Action Creators
//
export const addProject = (
  project: Project,
  isOnboardingCompleted: boolean
) => ({
  type: ADD_PROJECT,
  project,
  isOnboardingCompleted,
});

export const refreshProjectsStart = () => ({
  type: REFRESH_PROJECTS_START,
});

export const refreshProjectsError = (error: string) => ({
  type: REFRESH_PROJECTS_ERROR,
  error,
});

export const refreshProjectsFinish = (projects: ProjectsMap) => ({
  type: REFRESH_PROJECTS_FINISH,
  projects,
});

/**
 * This action figures out what dependencies are installed for a given
 * projectId.
 *
 * TODO: This should really have a "START" and "COMPLETE" action pair, so that
 * we can show some loading UI while it works.
 *
 * TODO: This is our last thunk! We should convert it to a saga, so we can
 * be rid of thunks altogether.
 */

export const loadDependencyInfoFromDisk = (
  projectId: string,
  projectPath: string
) => {
  return (dispatch: any, getState: Function) => {
    loadAllProjectDependencies(projectPath).then(dependencies => {
      dispatch({
        type: LOAD_DEPENDENCY_INFO_FROM_DISK,
        projectId,
        dependencies,
      });
    });
  };
};

export const createNewProjectStart = () => ({
  type: CREATE_NEW_PROJECT_START,
});

export const createNewProjectCancel = () => ({
  type: CREATE_NEW_PROJECT_CANCEL,
});

export const createNewProjectFinish = () => ({
  type: CREATE_NEW_PROJECT_FINISH,
});

export const dismissSidebarIntro = () => ({
  type: DISMISS_SIDEBAR_INTRO,
});

export const selectProject = (projectId: string) => ({
  type: SELECT_PROJECT,
  projectId,
});

export const runTask = (task: Task, timestamp: Date) => ({
  type: RUN_TASK,
  task,
  timestamp,
});

export const attachTaskMetadata = (
  task: Task,
  processId: number,
  port?: number
) => ({
  type: ATTACH_TASK_METADATA,
  task,
  processId,
  port,
});

export const abortTask = (task: Task, timestamp: Date) => ({
  type: ABORT_TASK,
  task,
  timestamp,
});

export const completeTask = (
  task: Task,
  timestamp: Date,
  wasSuccessful: boolean
) => ({
  type: COMPLETE_TASK,
  task,
  timestamp,
  wasSuccessful,
});

export const receiveDataFromTaskExecution = (
  task: Task,
  text: string,
  isError?: boolean
) => ({
  type: RECEIVE_DATA_FROM_TASK_EXECUTION,
  task,
  text,
  isError,
  logId: uuid(),
});

export const launchDevServer = (task: Task, timestamp: Date) => ({
  type: LAUNCH_DEV_SERVER,
  task,
  timestamp,
});

export const clearConsole = (task: Task) => ({
  type: CLEAR_CONSOLE,
  task,
});

export const addDependency = (projectId: string, dependencyName: string) => ({
  type: ADD_DEPENDENCY,
  projectId,
  dependencyName,
});

export const updateDependency = (
  projectId: string,
  dependencyName: string,
  latestVersion: string
) => ({
  type: UPDATE_DEPENDENCY,
  projectId,
  dependencyName,
  latestVersion,
});

export const deleteDependency = (
  projectId: string,
  dependencyName: string
) => ({
  type: DELETE_DEPENDENCY,
  projectId,
  dependencyName,
});

export const installDependenciesStart = (
  projectId: string,
  dependencies: Array<QueuedDependency>
) => ({
  type: INSTALL_DEPENDENCIES_START,
  projectId,
  dependencies,
});

export const installDependenciesError = (
  projectId: string,
  dependencies: Array<QueuedDependency>
) => ({
  type: INSTALL_DEPENDENCIES_ERROR,
  projectId,
  dependencies,
});

export const installDependenciesFinish = (
  projectId: string,
  dependencies: Array<Dependency>
) => ({
  type: INSTALL_DEPENDENCIES_FINISH,
  projectId,
  dependencies,
});

export const uninstallDependenciesStart = (
  projectId: string,
  dependencies: Array<QueuedDependency>
) => ({
  type: UNINSTALL_DEPENDENCIES_START,
  projectId,
  dependencies,
});

export const uninstallDependenciesError = (
  projectId: string,
  dependencies: Array<QueuedDependency>
) => ({
  type: UNINSTALL_DEPENDENCIES_ERROR,
  projectId,
  dependencies,
});

export const uninstallDependenciesFinish = (
  projectId: string,
  dependencies: Array<QueuedDependency>
) => ({
  type: UNINSTALL_DEPENDENCIES_FINISH,
  projectId,
  dependencies,
});

export const queueDependencyInstall = (
  projectId: string,
  name: string,
  version: string,
  updating?: boolean
) => ({
  type: QUEUE_DEPENDENCY_INSTALL,
  projectId,
  name,
  version,
  updating,
});

export const queueDependencyUninstall = (projectId: string, name: string) => ({
  type: QUEUE_DEPENDENCY_UNINSTALL,
  projectId,
  name,
});

export const startNextActionInQueue = (projectId: string) => ({
  type: START_NEXT_ACTION_IN_QUEUE,
  projectId,
});

export const showImportExistingProjectPrompt = () => ({
  type: SHOW_IMPORT_EXISTING_PROJECT_PROMPT,
});

export const importExistingProjectStart = (path: string) => ({
  type: IMPORT_EXISTING_PROJECT_START,
  path,
});

export const importExistingProjectError = () => ({
  type: IMPORT_EXISTING_PROJECT_ERROR,
});

export const importExistingProjectFinish = (
  projectPath: string,
  project: Project,
  isOnboardingCompleted: boolean
) => ({
  type: IMPORT_EXISTING_PROJECT_FINISH,
  projectPath,
  project,
  isOnboardingCompleted,
});

export const showDeleteProjectPrompt = (project: Project) => ({
  type: SHOW_DELETE_PROJECT_PROMPT,
  project,
});

export const finishDeletingProject = (projectId: string) => ({
  type: FINISH_DELETING_PROJECT,
  projectId,
});

export const showResetStatePrompt = () => ({
  type: SHOW_RESET_STATE_PROMPT,
});

export const resetAllState = () => ({ type: RESET_ALL_STATE });
