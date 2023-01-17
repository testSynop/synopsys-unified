import { run } from "../src/main";
// import {SynopsysBridge} from "../src/synopsys-action/synopsys-bridge";
// import * as synopsysBridge from '../src/synopsys-action/synopsys-bridge'
// import * as MockedSynopsysBridge from '../src/__mocks__/synopsys-bridge'
// import * as ex from '@actions/exec'
import * as configVariables from "@actions/artifact/lib/internal/config-variables";
import { error, info } from "@actions/core";
import * as inputs from "../src/synopsys-action/inputs";
import * as downloadUtility from "../src/synopsys-action/download-utility";
import * as validator from "../src/synopsys-action/validators";
import { DownloadFileResponse } from "../src/synopsys-action/download-utility";
import * as tools from "@actions/io/lib/io-util";
// import {SynopsysBridge} from "../src/synopsys-action/synopsys-bridge";
import requireActual = jest.requireActual;
import { ExecOptions } from "@actions/exec/lib/interfaces";
// import {POLARIS_SERVER_URL} from "../src/synopsys-action/inputs";
// import * as inputs from "../src/synopsys-action/inputs"

const sb = jest.requireActual("../src/synopsys-action/synopsys-bridge");
jest.mock("../src/synopsys-action/synopsys-bridge", () => {
  return {
    SynopsysBridge: jest.fn().mockImplementation(() => {
      return {
        ...sb.SynopsysBridge,
        bridgeExecutablePath: "",
        downloadBridge: async () => {
          info("Calling from mocked function");
        },
        prepareCommand: sb.SynopsysBridge.prototype.prepareCommand,
        checkIfSynopsysBridgeExists:
          sb.SynopsysBridge.prototype.checkIfSynopsysBridgeExists,
        executeBridgeCommand: sb.SynopsysBridge.prototype.executeBridgeCommand,
        getBridgeDefaultPath: sb.SynopsysBridge.prototype.getBridgeDefaultPath,
      };
    }),
  };

  //getBridgeDefaultPath: jest.fn(() => {return './bridge'}),

  /*return jest.fn().mockImplementation(function () {
        return {
            downloadBridge: () => {
                info('Calling from mocked function')
            },
        }
    })*/
});

// jest.mock('../src/synopsys-action/synopsys-bridge')
jest.mock("@actions/artifact/lib/internal/config-variables");
jest.mock("../src/synopsys-action/validators");
// jest.mock('../src/synopsys-action/download-utility')
// jest.mock('@actions/io/lib/io-util')
// jest.mock('@actions/exec')
/*jest.mock('../src/synopsys-action/inputs', () => ({
    POLARIS_SERVER_URL: 'server_url',
    BRIDGE_DOWNLOAD_URL: 'download_url',
}));*/

// const {default: mockSynopsysBridgeConstructor, mockDownloadBridge, mockPrepareCommand} = (SynopsysBridge as unknown) as typeof MockedSynopsysBridge

describe("sample e2e", () => {
  /*beforeEach(() => {
        jest.resetModules()
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })*/

  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
    Object.defineProperty(inputs, "BRIDGE_DOWNLOAD_URL", { value: null });
    Object.defineProperty(inputs, "POLARIS_SERVER_URL", { value: null });
    Object.defineProperty(inputs, "COVERITY_URL", { value: null });
    Object.defineProperty(inputs, "BLACKDUCK_URL", { value: null });
    Object.defineProperty(inputs, "POLARIS_ACCESS_TOKEN", { value: null });
    Object.defineProperty(inputs, "POLARIS_APPLICATION_NAME", { value: null });
    Object.defineProperty(inputs, "POLARIS_PROJECT_NAME", { value: null });
    Object.defineProperty(inputs, "POLARIS_ASSESSMENT_TYPES", { value: null });
    Object.defineProperty(inputs, "SYNOPSYS_BRIDGE_PATH", { value: null });
  });

  /*it('should e2e', async () => {
        // let mock = jest.spyOn(SynopsysBridge.prototype, 'downloadBridge')
        // mock.mockImplementation(() => {return Promise.resolve()})
        // jest.mock('synopsys-bridge', () => {
        //     return {
        //         downloadBridge: jest.fn().mockImplementation(() => {})
        //     }
        // })
        // Object.defineProperty(inputs, 'POLARIS_SERVER_URL', {value: 'server_url'})
        // Object.defineProperty(inputs, 'POLARIS_ACCESS_TOKEN', {value: 'access_token'})
        // Object.defineProperty(inputs, 'POLARIS_APPLICATION_NAME', {value: 'POLARIS_APPLICATION_NAME'})
        // Object.defineProperty(inputs, 'POLARIS_PROJECT_NAME', {value: 'POLARIS_PROJECT_NAME'})
        // Object.defineProperty(inputs, 'POLARIS_ASSESSMENT_TYPES', {value: '["SCA"]'})
        // jest.spyOn(SynopsysBridge.prototype, 'downloadBridge').mockImplementation(async () => {info('From mocked download')})
        jest.spyOn(polaris, 'validatePolarisInputs').mockReturnValueOnce(true)
        jest.spyOn(configVariables, 'getWorkSpaceDirectory').mockReturnValue('/Users/kishori/bridge')
        run().then(resp => {
            info('Success response')
            expect(true).toBeTruthy()
        }).catch(err => {
            info(err)
            expect(err).not.toBe(null)
        })
        // expect(SynopsysBridge).toHaveBeenCalledTimes(1)
        // expect(sb.SynopsysBridge).toHaveBeenCalledTimes(1)
        // expect(mock).toHaveBeenCalled()
        // expect(mockSynopsysBridgeConstructor).toHaveBeenCalledTimes(1)
        // expect(mockDownloadBridge).toHaveBeenCalledTimes(1)

    });*/

  it("should e2e 2", async () => {
    Object.defineProperty(inputs, "BRIDGE_DOWNLOAD_URL", {
      value: "download_url",
    });
    Object.defineProperty(inputs, "POLARIS_SERVER_URL", {
      value: "server_url",
    });
    // Object.defineProperty(inputs, 'POLARIS_ACCESS_TOKEN', {value: 'access_token'})
    Object.defineProperty(inputs, "POLARIS_APPLICATION_NAME", {
      value: "POLARIS_APPLICATION_NAME",
    });
    Object.defineProperty(inputs, "POLARIS_PROJECT_NAME", {
      value: "POLARIS_PROJECT_NAME",
    });
    Object.defineProperty(inputs, "POLARIS_ASSESSMENT_TYPES", {
      value: '["SCA"]',
    });
    Object.defineProperty(inputs, "SYNOPSYS_BRIDGE_PATH", { value: __dirname });

    // Object.defineProperty(process.env, 'HOME', {value: '/Users/kishori'})

    jest
      .spyOn(configVariables, "getWorkSpaceDirectory")
      .mockReturnValue("/Users/kishori/Project");
    // jest.spyOn(tools, 'tryGetExecutablePath').mockResolvedValueOnce('/Users/kishori/synopsys-bridge/bridge')

    /*const downloadFileResponse: DownloadFileResponse = {
            filePath: '',
            fileName: ''
        }*/

    /*jest.spyOn(ex, 'exec').mockImplementation(async (commandLine: string, args?: string[], options?: ExecOptions) => {
            info('In execution')
            return 0;
        })*/

    // jest.spyOn(SynopsysBridge.prototype, 'downloadBridge').mockImplementation(async () => {})
    // jest.spyOn(SynopsysBridge.prototype, 'getLatestVersion').mockImplementation(async () => {return Promise.resolve('okay')})
    jest.spyOn(validator, "validatePolarisInputs").mockReturnValueOnce(true);
    // jest.spyOn(downloadUtility, 'getRemoteFile').mockResolvedValueOnce(downloadFileResponse)
    try {
      const resp = await run();
      expect(resp).toBe(0);
      info("In success block");
    } catch (err: any) {
      info("In error block");
      expect(err.message).toContain("failed with exit code 2");
      error(err);
    }
  });
});
