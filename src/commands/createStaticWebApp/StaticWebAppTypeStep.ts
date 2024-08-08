import type { IAzureQuickPickItem } from "@microsoft/vscode-azext-utils";
import { AzureWizardPromptStep } from "@microsoft/vscode-azext-utils";
import { localize } from "../../utils/localize";
import { IStaticWebAppWizardContext } from "./IStaticWebAppWizardContext";

export class StaticWebAppTypeStep extends AzureWizardPromptStep<IStaticWebAppWizardContext> {
  public async prompt(context: IStaticWebAppWizardContext): Promise<void> {
    const placeHolder: string = localize(
      "selectStaticWebAppType",
      "Select the type of Static Web App"
    );
    const picks: IAzureQuickPickItem<boolean>[] = [
      { label: localize("staticWebApp", "Static Web App"), data: false },
      {
        label: localize(
          "staticWebAppWithLogicApp",
          "Static Web App with Logic App"
        ),
        data: true,
      },
    ];
    context.initializeLogicApp = (
      await context.ui.showQuickPick(picks, { placeHolder })
    ).data;
  }

  public shouldPrompt(context: IStaticWebAppWizardContext): boolean {
    return context.initializeLogicApp === undefined;
  }
}
