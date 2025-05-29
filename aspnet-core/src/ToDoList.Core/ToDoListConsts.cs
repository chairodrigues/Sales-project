using ToDoList.Debugging;

namespace ToDoList
{
    public class ToDoListConsts
    {
        public const string LocalizationSourceName = "ToDoList";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "30b552100b8d4a8c9428ce2eca3ac671";
    }
}
