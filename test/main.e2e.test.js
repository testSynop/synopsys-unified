"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
// import * as SynopsysBridge from '../src/synopsys-action/synopsys-bridge'
// import * as MockedSynopsysBridge from '../src/__mocks__/synopsys-bridge'
const configVariables = __importStar(require("@actions/artifact/lib/internal/config-variables"));
const core_1 = require("@actions/core");
const sb = jest.requireActual('../src/synopsys-action/synopsys-bridge');
jest.mock('../src/synopsys-action/synopsys-bridge', () => {
    return {
        SynopsysBridge: jest.fn().mockImplementation(() => {
            return {
                downloadBridge: () => {
                    (0, core_1.info)('Calling from mocked function');
                },
                prepareCommand: sb.SynopsysBridge.prototype.prepareCommand,
                executeBridgeCommand: sb.SynopsysBridge.prototype.executeBridgeCommand,
                checkIfSynopsysBridgeExists: sb.SynopsysBridge.prototype.checkIfSynopsysBridgeExists
            };
        })
    };
    /*return jest.fn().mockImplementation(function () {
        return {
            downloadBridge: () => {
                info('Calling from mocked function')
            },
        }
    })*/
});
// jest.mock('../src/synopsys-action/synopsys-bridge')
jest.mock('@actions/artifact/lib/internal/config-variables');
// const {default: mockSynopsysBridgeConstructor, mockDownloadBridge, mockPrepareCommand} = (SynopsysBridge as unknown) as typeof MockedSynopsysBridge
describe('sample e2e', () => {
    /*beforeEach(() => {
        jest.resetModules()
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })*/
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    it('should e2e', () => __awaiter(void 0, void 0, void 0, function* () {
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
        jest.spyOn(configVariables, 'getWorkSpaceDirectory').mockReturnValue('/Users/kishori/bridge');
        (0, main_1.run)().then(resp => {
            (0, core_1.info)('Success response');
            expect(true).toBeTruthy();
        }).catch(err => {
            (0, core_1.info)(err);
            expect(err).not.toBe(null);
        });
        // expect(SynopsysBridge).toHaveBeenCalledTimes(1)
        // expect(sb.SynopsysBridge).toHaveBeenCalledTimes(1)
        // expect(mock).toHaveBeenCalled()
        // expect(mockSynopsysBridgeConstructor).toHaveBeenCalledTimes(1)
        // expect(mockDownloadBridge).toHaveBeenCalledTimes(1)
    }));
});
