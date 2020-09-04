let operation={
     AssetCheck:{
          GetAssetCheckList: "GetAssetCheckList",
          RunAssetCheck: "RunAssetCheck",
          CancelAssetCheck: "CancelAssetCheck",
          RestartAssetCheck: "RestartAssetCheck"
          },
     AssetManagement:{
          GetAssetList: "GetAssetList",
          StartAssetOperation: "StartAssetOperation",
          AssetOperationStatus: "AssetOperationStatus",
          ClearAssetOperation: "ClearAssetOperation"
          },
     AudioManagement:{
          GetAudioMacro: "GetAudioMacro",
          GetAudioMacroList: "GetAudioMacroList",
          SetAudioMacro: "SetAudioMacro",
          GetAudioMute: "GetAudioMute",
          SetAudioMute: "SetAudioMute",
          GetAudioMicrophone: "GetAudioMicrophone",
          SetAudioMicrophone: "SetAudioMicrophone",
          GetAudioFader: "GetAudioFader",
          SetAudioFader: "SetAudioFader",
          GetAudioMonitor: "GetAudioMonitor",
          GetAudioEqPresetList: "GetAudioEqPresetList"
          },
     BackupManagement:{
          StartBackupGenerate: "StartBackupGenerate",
          GetBackupGenerateProgress: "GetBackupGenerateProgress",
          DeleteBackup: "DeleteBackup",
          StartBackupRestore: "StartBackupRestore",
          GetBackupRestoreProgress: "GetBackupRestoreProgress",
          GetBackupInformation: "GetBackupInformation"
          },
     BackupScan:{
          StartBackupScan: "StartBackupScan",
          GetBackupScanResult: "GetBackupScanResult",
          GetBackupFileInfo: "GetBackupFileInfo",
          CancelBackupScan: "CancelBackupScan",
          GetBackupScanProgress: "GetBackupScanProgress"
          },
     ConfigManagement:{
          GetConfigurationFileContent: "GetConfigurationFileContent",
          SetConfigurationFileContent: "SetConfigurationFileContent",
          DeleteConfigurationFile: "DeleteConfigurationFile"
          },
     CPLManagement:{
          GetCPLList: "GetCPLList",
          DeleteCPL: "DeleteCPL",
          GetCPLInfo: "GetCPLInfo",
          GetCPLContent: "GetCPLContent",
          SetCPLContent: "SetCPLContent",
          ValidateCPL: "ValidateCPL",
          GetCPLListInfo: "GetCPLListInfo",
          GetCPLSettings: "GetCPLSettings",
          SetCPLSettings: "SetCPLSettings",
          RunIntegrityChecks: "RunIntegrityChecks",
          AbortIntegrityChecks: "AbortIntegrityChecks",
          GetCPLDefaultSettings: "GetCPLDefaultSettings"
          },
     DateTimeManagement:{
          GetTime: "GetTime",
          SetTime: "SetTime",
          GetTimeZone: "GetTimeZone",
          SetTimeZone: "SetTimeZone",
          GetNTPStatus: "GetNTPStatus"
          },
     Diagnostics:{
          GenerateReport: "GenerateReport",
          CreateReportTask: "CreateReportTask",
          DeleteReportTask: "DeleteReportTask",
          GetReportTaskList: "GetReportTaskList"
          },
     DLMManagement:{
          GetDLMList: "GetDLMList",
          DeleteDLM: "DeleteDLM",
          GetDLMContent: "GetDLMContent",
          SetDLMContent: "SetDLMContent"
          },
     ExportManagement:{
          GetExportLocations: "GetExportLocations",
          GetExportStatus: "GetExportStatus",
          ExportData: "ExportData",
          CancelExport: "CancelExport"
          },
     FeatureManagement:{
          GetFeatureInfo: "GetFeatureInfo",
          RefreshFeatureInfo: "RefreshFeatureInfo"
          },
     IngestManagement:{
          CreateIngestTask: "CreateIngestTask",
          PauseIngestTask: "PauseIngestTask",
          ResumeIngestTask: "ResumeIngestTask",
          CancelIngestTask: "CancelIngestTask",
          DeleteIngestTask: "DeleteIngestTask",
          UpdateIngestTask: "UpdateIngestTask",
          GetIngestTaskList: "GetIngestTaskList",
          GetIngestTaskInfo: "GetIngestTaskInfo",
          GetIngestTaskStatus: "GetIngestTaskStatus",
          GetIngestTaskEventCount: "GetIngestTaskEventCount",
          GetIngestTaskEventMessage: "GetIngestTaskEventMessage",
          GetIngestTaskListInfo: "GetIngestTaskListInfo",
          GetIngestTaskEventList: "GetIngestTaskEventList"
          },
     IngestScan:{
          StartScan: "StartScan",
          CancelScan: "CancelScan",
          GetScanStatus: "GetScanStatus",
          GetScanResult: "GetScanResult",
          ClearScan: "ClearScan"
          },
     InputFeedManagement:{
          GetInputFeedList: "GetInputFeedList",
          ConfigureInputFeed: "ConfigureInputFeed",
          GetInputFeedProgramList: "GetInputFeedProgramList",
          GetInputFeedStatus: "GetInputFeedStatus"
          },
     KDMManagement:{
          GetKDMList: "GetKDMList",
          DeleteKDM: "DeleteKDM",
          GetKDMInfo: "GetKDMInfo",
          GetKDMContent: "GetKDMContent",
          SetKDMContent: "SetKDMContent",
          GetKDMListInfo: "GetKDMListInfo"
          },
     LogManagement:{
          CreateLogSnapshot: "CreateLogSnapshot",
          GetLogSnapshotList: "GetLogSnapshotList",
          DeleteLogSnapshot: "DeleteLogSnapshot",
          QueryLog: "QueryLog"
          },
     MacroManagement:{
          GetMacroList: "GetMacroList",
          GetMacroInfo: "GetMacroInfo",
          RunMacro: "RunMacro"
          },
     Maintenance:{
          GetMaintenanceTaskList: "GetMaintenanceTaskList",
          GetMaintenanceOperationList: "GetMaintenanceOperationList",
          AddMaintenanceOperation: "AddMaintenanceOperation"
          },
     NetworkManagement:{
          GetNetworkList: "GetNetworkList",
          GetNetworkConfig: "GetNetworkConfig",
          SetNetworkConfig: "SetNetworkConfig",
          GetNetworkInfo: "GetNetworkInfo"
          },
     NotificationEvents:{
          GetNotificationStatus: "GetNotificationStatus",
          GetNotificationList: "GetNotificationList",
          SetEventTag: "SetEventTag",
          ResetEventTag: "ResetEventTag"
          },
     PowerManagement:{
          Shutdown: "Shutdown",
          Reboot: "Reboot",
          CancelShutdown: "CancelShutdown",
          CancelReboot: "CancelReboot",
          Standby: "Standby",
          Wakeup: "Wakeup"
          },
     Projectors:{
          GetMacroList: "GetMacroList"
          },
     ScheduleManagement:{
          CreateSchedule: "CreateSchedule",
          GetScheduleList: "GetScheduleList",
          DeleteSchedule: "DeleteSchedule",
          GetScheduleInfo: "GetScheduleInfo",
          GetSchedulerStatus: "GetSchedulerStatus",
          StartScheduler: "StartScheduler",
          StopScheduler: "StopScheduler"
          },
     Sensors:{
          GetModuleList: "GetModuleList",
          GetTemperatureList: "GetTemperatureList",
          GetFanList: "GetFanList",
          GetVoltageList: "GetVoltageList"
          },
     ServiceManagement:{
          StartService: "StartService",
          StopService: "StopService",
          RestartService: "RestartService"
          },
     SessionManagement:{
          Login: "Login",
          Logout: "Logout",
          WhoAmI: "WhoAmI",
          Relogin: "Relogin"
          },
     ShowControl:{
          Play: "Play",
          Pause: "Pause",
          Eject: "Eject",
          SkipForward: "SkipForward",
          SkipBackward: "SkipBackward",
          JumpForward: "JumpForward",
          JumpBackward: "JumpBackward",
          JumpTimecode: "JumpTimecode",
          JumpElement: "JumpElement",
          SetLoopMode: "SetLoopMode",
          GetLoopMode: "GetLoopMode",
          LoadShowAsset: "LoadShowAsset",
          LoadClip: "LoadClip",
          LoadShowContent: "LoadShowContent",
          GetShowStatus: "GetShowStatus",
          GetShowLockStatus: "GetShowLockStatus",
          GetElementListStatus: "GetElementListStatus",
          GetLoadingStatus: "GetLoadingStatus",
          GetErrorStatus: "GetErrorStatus"
          },
     SNMP:{
          GetSNMP: "GetSNMP"
          },
     SPLManagement:{
          GetSPLList: "GetSPLList",
          DeleteSPL: "DeleteSPL",
          GetSPLInfo: "GetSPLInfo",
          GetSPLContent: "GetSPLContent",
          SetSPLContent: "SetSPLContent",
          GetSPLListInfo: "GetSPLListInfo",
          GetSPLRuntime: "GetSPLRuntime"
          },
     StorageManagement:{
          GetStorageList: "GetStorageList",
          GetStorageUnitInfo: "GetStorageUnitInfo",
          AddActiveUnit: "AddActiveUnit",
          RemoveActiveUnit: "RemoveActiveUnit",
          StartStorageInit: "StartStorageInit",
          GetStorageInitStatus: "GetStorageInitStatus"
          },
     SystemInformation:{
          GetProductInformation: "GetProductInformation",
          GetSoftwareInventoryList: "GetSoftwareInventoryList",
          GetHardwareInventoryList: "GetHardwareInventoryList",
          GetHostname: "GetHostname",
          SetHostname: "SetHostname",
          GetCertificateList: "GetCertificateList",
          GetFeatureList: "GetFeatureList"
          },
     SystemOverview:{
          GetSystemOverview: "GetSystemOverview",
          GetSystemStatus: "GetSystemStatus"
          },
     TKR:{
          CreateTkrTask: "CreateTkrTask",
          GetTkrTaskList: "GetTkrTaskList",
          CancelTkrTask: "CancelTkrTask",
          GetTkrTaskInfo: "GetTkrTaskInfo"
          },
     Toolbox:{
          EncryptConfigPassword: "EncryptConfigPassword",
          TestURIAccess: "TestURIAccess"
          },
     TriggerManagement:{
          GetTriggerList: "GetTriggerList",
          GetTriggerInfo: "GetTriggerInfo"
          },
     UserManagement:{
          GetUserList: "GetUserList",
          GetGroupList: "GetGroupList",
          GetUserListInfo: "GetUserListInfo",
          CreateUser: "CreateUser",
          DeleteUser: "DeleteUser",
          ModifyUser: "ModifyUser",
          GetUserInfo: "GetUserInfo",
          ChangeUserPassword: "ChangeUserPassword"
          },
     VirtualAssetManagement:{
          CreateVirtualClip: "CreateVirtualClip",
          GetVirtualClipList: "GetVirtualClipList"
          },
     WebUI:{
          GetFooter: "GetFooter",
          GetConnectionCount: "GetConnectionCount",
          GetCounters: "GetCounters"
          }
}
module.exports = operation;
