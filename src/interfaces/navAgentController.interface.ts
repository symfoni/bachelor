/**
 * INAVAgentController is an interface for the functions within the NAVAgentController class.
 */
export interface INAVAgentController {
    isQualifiedForUnemploymentBenefits(presentationToken: string): Promise<boolean | Error>
}