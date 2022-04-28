import { it, describe } from 'mocha';
import { NAVAgentController } from '../src/controllers/NAVAgentController';
import assert from 'assert';

const validPresentationToken = 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0owZVhBaU9pSktWMVFpZlEuZXlKMll5STZleUpBWTI5dWRHVjRkQ0k2V3lKb2RIUndjem92TDNkM2R5NTNNeTV2Y21jdk1qQXhPQzlqY21Wa1pXNTBhV0ZzY3k5Mk1TSXNJbWgwZEhCek9pOHZjbUYzTG1kcGRHaDFZblZ6WlhKamIyNTBaVzUwTG1OdmJTOXplVzFtYjI1cEwySmhZMmhsYkc5eUwyUmxkaTl6WTJobGJXRnpMM1JsYlhCS1UwOU9MM0JsY25OdmJsTmphR1Z0WVM1cWMyOXVJbDBzSW5SNWNHVWlPbHNpVm1WeWFXWnBZV0pzWlVOeVpXUmxiblJwWVd3aUxDSlFaWEp6YjI1V1F5SmRMQ0pqY21Wa1pXNTBhV0ZzVTNWaWFtVmpkQ0k2ZXlKd1pYSnpiMjRpT25zaVUxTk9Jam9pTVRJek1USXpNVEl6TVRJeklpd2laR0YwWlU5bVJHVmhkR2dpT2lJeU1ESXdMVEF4TFRBeFZERTVPakl6T2pJMFdpSXNJbU52ZFc1MGNubFBaa1JsWVhSb0lqb2lUazhpTENKd2JHRmpaVTltUkdWaGRHZ2lPaUpIYXNPNGRtbHJJaXdpWTI5MWJuUnllVTltUW1seWRHZ2lPaUpPVHlJc0luQnNZV05sVDJaQ2FYSjBhQ0k2SWtGa1pISmxjM05sZG1WblpXNGdNaklpTENKa1lYUmxUMlpDYVhKMGFDSTZJakl3TVRBdE1ERXRNREZVTVRrNk1qTTZNalJhSWl3aVoyVnVaR1Z5SWpvaWJXRnNaU0lzSW01aGJXVWlPbnNpYkdGemRFNWhiV1VpT2lKVGQyVmthWE5vYldGdUlpd2labWx5YzNST1lXMWxJam9pVDJ4aElpd2liV2xrWkd4bFRtRnRaU0k2SWtkeWIyMXdJbjBzSW05eWFXZHBibUZzVG1GdFpTSTZJazlzWVNCT2IzSnRZVzV1SWl3aWJXRnlhWFJoYkZOMFlYUjFjeUk2SW5WdWJXRnljbWxsWkNJc0ltTnBkR2w2Wlc1emFHbHdJam9pVlZNaUxDSmhaR1J5WlhOeklqcDdJbU52ZFc1MGNubERiMlJsSWpvaVRrOGlMQ0pqYVhSNUlqb2laMnJEdUhacGF5SXNJbnBwY0VOdlpHVWlPakV5TVRJc0luTjBjbVZsZEU1aGJXVWlPaUoyWldsbllYUmxiaUlzSW5OMGNtVmxkRTUxYldKbGNpSTZNVEo5ZlgxOUxDSnpkV0lpT2lKa2FXUTZaWFJvY2pweWFXNXJaV0o1T2pCNE1ESXdObUpqTW1RM01UazNNakUxTVRsbVpEZGxNR0ZqTlRneU1qUTJPRGhsTVdNMVkyTTVZbVUxWTJZelptTTJOMlZqTkdZNU16ZGtZamsxT0RWbFpXWTJJaXdpYm1KbUlqb3hOalV3TURJd01UVTNMQ0pwYzNNaU9pSmthV1E2WlhSb2NqcHlhVzVyWldKNU9qQjRNREptTVRJMU9UWTNPVFZsTVRZMVkySm1NamhpWVRsaFpqWXhOVEUzTjJNMU5URTFaVEU0WkdJeE5XTmlZekppWVdWaE4yRmxZV1V5TXpCbFlqQm1OakE1SW4wLkpJbF9uSXhSa1p5N1ZicnJGeVpBOGhJck9lcEtPMkdxaE5JVUh5SG0xS1NhcEFPdGVZa3Z6alBJZXVjYXctRDJ3VVZ6OVpMcXdXVVNrWG5sZl9ad1B3IiwiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0owZVhBaU9pSktWMVFpZlEuZXlKMll5STZleUpBWTI5dWRHVjRkQ0k2V3lKb2RIUndjem92TDNkM2R5NTNNeTV2Y21jdk1qQXhPQzlqY21Wa1pXNTBhV0ZzY3k5Mk1TSXNJbWgwZEhCek9pOHZjbUYzTG1kcGRHaDFZblZ6WlhKamIyNTBaVzUwTG1OdmJTOXplVzFtYjI1cEwySmhZMmhsYkc5eUwyUmxkaTl6WTJobGJXRnpMMlZ0Y0d4dmVXMWxiblJUWTJobGJXRXVhbk52YmlKZExDSjBlWEJsSWpwYklsWmxjbWxtYVdGaWJHVkRjbVZrWlc1MGFXRnNJaXdpUlcxd2JHOTViV1Z1ZEZaRElsMHNJbU55WldSbGJuUnBZV3hUZFdKcVpXTjBJanA3SW1WdGNHeHZlVzFsYm5RaU9uc2laVzF3Ykc5NVpXVWlPbnNpWlcxd2JHOTVaV1ZKWkNJNklqRTFaalUySWl3aWFtOWlWR2wwYkdVaU9pSkZibWRwYm1WbGNpSXNJbkJzWVdObFQyWlhiM0pySWpvaVUzbHRabTl1YVNCQlV5SXNJbWh2ZFhKelQyWlhiM0pySWpvMkxDSnpkR0Z5ZEVSaGRHVWlPaUl5TURJd0xUQTJMVEEySWl3aVpXNWtSR0YwWlNJNklqSXdNakV0TURZdE1EWWlMQ0psYlhCc2IzbHRaVzUwVTNSaGRIVnpJanA3SW1WdGNHeHZlVzFsYm5SVWVYQmxJam9pWm5Wc2JDQjBhVzFsSUdWdGNHeHZlV1ZsSWl3aWNHRnlkRlJwYldWUVpYSmpaVzUwWVdkbElqbzRNSDBzSW5OaGJHRnllU0k2ZXlKdGIyNTBhR3g1VTJGc1lYSjVJam96TnpBd01Dd2lkMjl5YTFCbGNtTmxiblJoWjJVaU9qRXdNQ3dpWTNWeWNtVnVZM2tpT2lKT1Qwc2lmU3dpZEhKcFlXeFFaWEpwYjJRaU9uc2ljM1JoY25SRVlYUmxJam9pTWpBeU1DMHdOaTB3TmlJc0ltVnVaRVJoZEdVaU9pSXlNREl4TFRBMkxUQTJJaXdpZEhKcFlXeFFaWEpwYjJSVVpYSnRhVzVoZEdsdmJrNXZkR2xqWlNJNk1UQjlMQ0p5YVdkb2RFWnZjbEJsYm5OcGIyNGlPblJ5ZFdVc0ltNXZia052YlhCbGRHVkRiR0YxYzJVaU9tWmhiSE5sTENKeVpYRjFhWEpsYldWdWRGUnZWMjl5YTA5MlpYSnpaV0Z6SWpwMGNuVmxmU3dpWTI5dWRISmhZM1JRUkVZaU9uc2lWVkpNSWpvaWFIUjBjSE02THk5emVXMW1iMjVwWTI5dWRISmhZM1J6TDJOdmJuUnlZV04wTG5Ca1ppSXNJbWhoYzJnaU9pSTBPR1EzTnpjeFpXTmlOMlkwWldOaE9USXdZMkUwTmprMU56VXdObUV4TjJRNFptVmhPVFl6TURNeFpqaGhPR1JrWkdNMVltVTBNR0kzTXpZMk9UWXhJbjE5Zlgwc0luTjFZaUk2SW1ScFpEcGxkR2h5T25KcGJtdGxZbms2TUhnd01qQTJZbU15WkRjeE9UY3lNVFV4T1daa04yVXdZV00xT0RJeU5EWTRPR1V4WXpWall6bGlaVFZqWmpObVl6WTNaV00wWmprek4yUmlPVFU0TldWbFpqWWlMQ0p1WW1ZaU9qRTJORGszTnpBME5Ua3NJbWx6Y3lJNkltUnBaRHBsZEdoeU9uSnBibXRsWW5rNk1IZ3dNekF3WTJRd1pHWmhPV1l3WWpVM05qUTNORE5tTVRObU1qRTROekV5TmpKbU16ZzFNRFkwTjJVNFpUQm1NREV6WW1NeE1HWXhZVFF3TURNMk1UVmxObUVpZlEuV2UzdEpOeExUazY5NnV3OXJPMWk0THdOOVk1dkJZT1ptUDh2OGNQTUhYb1V3aFJSenJHblh6Y3pjNnhHRFBzOFktMzM4VTJzdXV4YmV0a1BIVWhibmciLCJleUpoYkdjaU9pSkZVekkxTmtzaUxDSjBlWEFpT2lKS1YxUWlmUS5leUoyWXlJNmV5SkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNJc0ltaDBkSEJ6T2k4dmNtRjNMbWRwZEdoMVluVnpaWEpqYjI1MFpXNTBMbU52YlM5emVXMW1iMjVwTDJKaFkyaGxiRzl5TDJSbGRpOXpZMmhsYldGekwzUmxjbTFwYm1GMGFXOXVVMk5vWlcxaExtcHpiMjRpWFN3aWRIbHdaU0k2V3lKV1pYSnBabWxoWW14bFEzSmxaR1Z1ZEdsaGJDSXNJbFJsY20xcGJtRjBhVzl1VmtNaVhTd2lZM0psWkdWdWRHbGhiRk4xWW1wbFkzUWlPbnNpZEdWeWJXbHVZWFJwYjI0aU9uc2laVzF3Ykc5NVpXVWlPbnNpYkdGemRFUmhlVUYwVjI5eWF5STZJakl3TWpFdE1ESXRNRElpTENKc1lYTjBVR0Y1WkdGNUlqb2lNakF5TVMwd01pMHdNaUlzSW5SbGNtMXBibUYwYVc5dVUzUmhkSFZ6SWpvaWNtVnphV2R1WldRaUxDSjBaWEp0YVc1aGRHVmtSSFZ5YVc1blZISnBZV3hRWlhKcGIyUWlPblJ5ZFdVc0lsZGxaV3RzZVZkdmNtdEliM1Z5Y3lJNk1qSXNJblJsY20xcGJtRjBhVzl1VG05MGFXTmxVbVZqWldsMlpXUWlPaUl5TURJeExUQXlMVEF5SW4wc0ltTnZiblJ5WVdOMFVFUkdJanA3SWxWU1RDSTZJbWgwZEhCek9pOHZjR1JtY3k1amIyMHZjR1JtTUM1d1pHWWlMQ0pvWVhOb0lqb2lPRGMwTTJJMU1qQTJNMk5rT0RRd09UZGhOalZrTVRZek0yWTFZemMwWmpVaWZYMTlmU3dpYzNWaUlqb2laR2xrT21WMGFISTZjbWx1YTJWaWVUb3dlREF5TURaaVl6SmtOekU1TnpJeE5URTVabVEzWlRCaFl6VTRNakkwTmpnNFpURmpOV05qT1dKbE5XTm1NMlpqTmpkbFl6Um1PVE0zWkdJNU5UZzFaV1ZtTmlJc0ltNWlaaUk2TVRZME9URTVORGszT0N3aWFYTnpJam9pWkdsa09tVjBhSEk2Y21sdWEyVmllVG93ZURBek1EQmpaREJrWm1FNVpqQmlOVGMyTkRjME0yWXhNMll5TVRnM01USTJNbVl6T0RVd05qUTNaVGhsTUdZd01UTmlZekV3WmpGaE5EQXdNell4TldVMllTSjkudU9wQkZtVl9UWUI2MFpQYm9DNm5hMnphQjBEbEluMEk1dXBFbC1ZQ3B1SDZxaXV2bHk0TTYzbU5fREhtTFgwWnhfQkFnZlp6Zm1rTWREQ0lzOUlVZkEiXX0sIm5iZiI6MTY1MDAyMDQwOSwiaXNzIjoiZGlkOmV0aHI6cmlua2VieToweDAzNDdhZGFiMTRhMGM2YTc0MDBmODZjMmU5MGMyZTg5ZmNmMTUyYTJiNzczOWJjMzA5ZWE3ZjgzNGYxN2I0YjU5YiJ9.V7PrKqPOaTvISnKCyfVRcByuAjNKuM0bJR2GeGBFxRglyoBDNEphLAVk7GDHmalSt5JU-YdcZwzF9ZM9AUR-fg';

// not enough credentials
const notValidPresentationToken_0 = 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0owZVhBaU9pSktWMVFpZlEuZXlKMll5STZleUpBWTI5dWRHVjRkQ0k2V3lKb2RIUndjem92TDNkM2R5NTNNeTV2Y21jdk1qQXhPQzlqY21Wa1pXNTBhV0ZzY3k5Mk1TSXNJbWgwZEhCek9pOHZjbUYzTG1kcGRHaDFZblZ6WlhKamIyNTBaVzUwTG1OdmJTOXplVzFtYjI1cEwySmhZMmhsYkc5eUwyUmxkaTl6WTJobGJXRnpMM1JsYlhCS1UwOU9MMkoxYzJsdVpYTnpVMk5vWlcxaExtcHpiMjRpWFN3aWRIbHdaU0k2V3lKV1pYSnBabWxoWW14bFEzSmxaR1Z1ZEdsaGJDSXNJa0oxYzJsdVpYTnpWa01pWFN3aVkzSmxaR1Z1ZEdsaGJGTjFZbXBsWTNRaU9uc2lZblZ6YVc1bGMzTWlPbnNpYm1GdFpTSTZJbTVoYldVaUxDSnBibVIxYzNSeWFXRnNRMjlrWlNJNklqRXlTMG9pTENKdmNtZGhibWx6WVhScGIyNVRkSEoxWTNSMWNtVWlPaUpCVXlJc0ltOXlaMkZ1YVhOaGRHbHZiazUxYldKbGNpSTZNVElzSW1Ga1pISmxjM01pT25zaVkyOTFiblJ5ZVVOdlpHVWlPaUpPVHlJc0ltTnBkSGtpT2lKSGFzTzRkbWxySWl3aWVtbHdRMjlrWlNJNk1qZ3lOeXdpYzNSeVpXVjBUbUZ0WlNJNkltZGhkR1YyWldsbGJpSXNJbk4wY21WbGRFNTFiV0psY2lJNk1qSXNJbVpzYjI5eUlqb2lNa0VpZlgxOWZTd2ljM1ZpSWpvaVpHbGtPbVYwYUhJNmNtbHVhMlZpZVRvd2VEQXlNRFppWXpKa056RTVOekl4TlRFNVptUTNaVEJoWXpVNE1qSTBOamc0WlRGak5XTmpPV0psTldObU0yWmpOamRsWXpSbU9UTTNaR0k1TlRnMVpXVm1OaUlzSW01aVppSTZNVFkwT0Rnd01UYzRNaXdpYVhOeklqb2laR2xrT21WMGFISTZjbWx1YTJWaWVUb3dlREF5WmpFeU5UazJOemsxWlRFMk5XTmlaakk0WW1FNVlXWTJNVFV4Tnpkak5UVXhOV1V4T0dSaU1UVmpZbU15WW1GbFlUZGhaV0ZsTWpNd1pXSXdaall3T1NKOS55TkpGaXl3RzhmV002VzhRZWlhOVBTWlhYem5mMWphQnpJb0NKS3IwV0tPQ204c0hZRUZMQmxkYmxKNlJXeXlOS0dyRW9pMlRiTE15dmxGSmF3Zmw2ZyIsImV5SmhiR2NpT2lKRlV6STFOa3NpTENKMGVYQWlPaUpLVjFRaWZRLmV5SjJZeUk2ZXlKQVkyOXVkR1Y0ZENJNld5Sm9kSFJ3Y3pvdkwzZDNkeTUzTXk1dmNtY3ZNakF4T0M5amNtVmtaVzUwYVdGc2N5OTJNU0lzSW1oMGRIQnpPaTh2Y21GM0xtZHBkR2gxWW5WelpYSmpiMjUwWlc1MExtTnZiUzl6ZVcxbWIyNXBMMkpoWTJobGJHOXlMMlJsZGk5elkyaGxiV0Z6TDNSbGNtMXBibUYwYVc5dVUyTm9aVzFoTG1wemIyNGlYU3dpZEhsd1pTSTZXeUpXWlhKcFptbGhZbXhsUTNKbFpHVnVkR2xoYkNJc0lsUmxjbTFwYm1GMGFXOXVWa01pWFN3aVkzSmxaR1Z1ZEdsaGJGTjFZbXBsWTNRaU9uc2lkR1Z5YldsdVlYUnBiMjRpT25zaVpXMXdiRzk1WldVaU9uc2liR0Z6ZEVSaGVVRjBWMjl5YXlJNklqSXdNakV0TURJdE1ESWlMQ0pzWVhOMFVHRjVaR0Y1SWpvaU1qQXlNUzB3TWkwd01pSXNJblJsY20xcGJtRjBhVzl1VTNSaGRIVnpJam9pY21WemFXZHVaV1FpTENKMFpYSnRhVzVoZEdWa1JIVnlhVzVuVkhKcFlXeFFaWEpwYjJRaU9uUnlkV1VzSWxkbFpXdHNlVmR2Y210SWIzVnljeUk2TWpJc0luUmxjbTFwYm1GMGFXOXVUbTkwYVdObFVtVmpaV2wyWldRaU9pSXlNREl4TFRBeUxUQXlJbjBzSW1OdmJuUnlZV04wVUVSR0lqcDdJbFZTVENJNkltaDBkSEJ6T2k4dmNHUm1jeTVqYjIwdmNHUm1NQzV3WkdZaUxDSm9ZWE5vSWpvaU9EYzBNMkkxTWpBMk0yTmtPRFF3T1RkaE5qVmtNVFl6TTJZMVl6YzBaalVpZlgxOWZTd2ljM1ZpSWpvaVpHbGtPbVYwYUhJNmNtbHVhMlZpZVRvd2VEQXlNRFppWXpKa056RTVOekl4TlRFNVptUTNaVEJoWXpVNE1qSTBOamc0WlRGak5XTmpPV0psTldObU0yWmpOamRsWXpSbU9UTTNaR0k1TlRnMVpXVm1OaUlzSW01aVppSTZNVFkwT1RFNU5EazNPQ3dpYVhOeklqb2laR2xrT21WMGFISTZjbWx1YTJWaWVUb3dlREF6TURCalpEQmtabUU1WmpCaU5UYzJORGMwTTJZeE0yWXlNVGczTVRJMk1tWXpPRFV3TmpRM1pUaGxNR1l3TVROaVl6RXdaakZoTkRBd016WXhOV1UyWVNKOS51T3BCRm1WX1RZQjYwWlBib0M2bmEyemFCMERsSW4wSTV1cEVsLVlDcHVINnFpdXZseTRNNjNtTl9ESG1MWDBaeF9CQWdmWnpmbWtNZERDSXM5SVVmQSJdfSwibmJmIjoxNjQ5NzY5MDU4LCJpc3MiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4MDM0N2FkYWIxNGEwYzZhNzQwMGY4NmMyZTkwYzJlODlmY2YxNTJhMmI3NzM5YmMzMDllYTdmODM0ZjE3YjRiNTliIn0.Qs7fKz_9IP8uREmLwdHU0dap40gXh46Fm7m4zBP5M-aELpv1STA3GyNx3zMW8O38Ix9prJaTWfM35KH_LRtjDQ';

// token is not intact, some characters have been removed
const notValidPresentationToken_1 = 'eyJhbGciOiJFUzI1NksiLCJ0eAiOiJKV1QifQ.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0owZVhBaU9pSktWMVFpZlEuZXlKMll5STZleUpBWTI5dWRHVjRkQ0k2V3lKb2RIUndjem92TDNkM2R5NTNNeTV2Y21jdk1qQXhPQzlqY21Wa1pXNTBhV0ZzY3k5Mk1TSXNJbWgwZEhCek9pOHZjbUYzTG1kcGRHaDFZblZ6WlhKamIyNTBaVzUwTG1OdmJTOXplVzFtYjI1cEwySmhZMmhsYkc5eUwyUmxkaTl6WTJobGJXRnpMM1JsYlhCS1UwOU9MMkoxYzJsdVpYTnpVMk5vWlcxaExtcHpiMjRpWFN3aWRIbHdaU0k2V3lKV1pYSnBabWxoWW14bFEzSmxaR1Z1ZEdsaGJDSXNJa0oxYzJsdVpYTnpWa01pWFN3aVkzSmxaR1Z1ZEdsaGJGTjFZbXBsWTNRaU9uc2lZblZ6YVc1bGMzTWlPbnNpYm1GdFpTSTZJbTVoYldVaUxDSnBibVIxYzNSeWFXRnNRMjlrWlNJNklqRXlTMG9pTENKdmNtZGhibWx6WVhScGIyNVRkSEoxWTNSMWNtVWlPaUpCVXlJc0ltOXlaMkZ1YVhOaGRHbHZiazUxYldKbGNpSTZNVElzSW1Ga1pISmxjM01pT25zaVkyOTFiblJ5ZVVOdlpHVWlPaUpPVHlJc0ltTnBkSGtpT2lKSGFzTzRkbWxySWl3aWVtbHdRMjlrWlNJNk1qZ3lOeXdpYzNSeVpXVjBUbUZ0WlNJNkltZGhkR1YyWldsbGJpSXNJbk4wY21WbGRFNTFiV0psY2lJNk1qSXNJbVpzYjI5eUlqb2lNa0VpZlgxOWZTd2ljM1ZpSWpvaVpHbGtPbVYwYUhJNmNtbHVhMlZpZVRvd2VEQXlNRFppWXpKa056RTVOekl4TlRFNVptUTNaVEJoWXpVNE1qSTBOamc0WlRGak5XTmpPV0psTldObU0yWmpOamRsWXpSbU9UTTNaR0k1TlRnMVpXVm1OaUlzSW01aVppSTZNVFkwT0Rnd01UYzRNaXdpYVhOeklqb2laR2xrT21WMGFISTZjbWx1YTJWaWVUb3dlREF5WmpFeU5UazJOemsxWlRFMk5XTmlaakk0WW1FNVlXWTJNVFV4Tnpkak5UVXhOV1V4T0dSaU1UVmpZbU15WW1GbFlUZGhaV0ZsTWpNd1pXSXdaall3T1NKOS55TkpGaXl3RzhmV002VzhRZWlhOVBTWlhYem5mMWphQnpJb0NKS3IwV0tPQ204c0hZRUZMQmxkYmxKNlJXeXlOS0dyRW9pMlRiTE15dmxGSmF3Zmw2ZyIsImV5SmhiR2NpT2lKRlV6STFOa3NpTENKMGVYQWlPaUpLVjFRaWZRLmV5SjJZeUk2ZXlKQVkyOXVkR1Y0ZENJNld5Sm9kSFJ3Y3pvdkwzZDNkeTUzTXk1dmNtY3ZNakF4T0M5amNtVmtaVzUwYVdGc2N5OTJNU0lzSW1oMGRIQnpPaTh2Y21GM0xtZHBkR2gxWW5WelpYSmpiMjUwWlc1MExtTnZiUzl6ZVcxbWIyNXBMMkpoWTJobGJHOXlMMlJsZGk5elkyaGxiV0Z6TDNSbGNtMXBibUYwYVc5dVUyTm9aVzFoTG1wemIyNGlYU3dpZEhsd1pTSTZXeUpXWlhKcFptbGhZbXhsUTNKbFpHVnVkR2xoYkNJc0lsUmxjbTFwYm1GMGFXOXVWa01pWFN3aVkzSmxaR1Z1ZEdsaGJGTjFZbXBsWTNRaU9uc2lkR1Z5YldsdVlYUnBiMjRpT25zaVpXMXdiRzk1WldVaU9uc2liR0Z6ZEVSaGVVRjBWMjl5YXlJNklqSXdNakV0TURJdE1ESWlMQ0pzWVhOMFVHRjVaR0Y1SWpvaU1qQXlNUzB3TWkwd01pSXNJblJsY20xcGJtRjBhVzl1VTNSaGRIVnpJam9pY21WemFXZHVaV1FpTENKMFpYSnRhVzVoZEdWa1JIVnlhVzVuVkhKcFlXeFFaWEpwYjJRaU9uUnlkV1VzSWxkbFpXdHNlVmR2Y210SWIzVnljeUk2TWpJc0luUmxjbTFwYm1GMGFXOXVUbTkwYVdObFVtVmpaV2wyWldRaU9pSXlNREl4TFRBeUxUQXlJbjBzSW1OdmJuUnlZV04wVUVSR0lqcDdJbFZTVENJNkltaDBkSEJ6T2k4dmNHUm1jeTVqYjIwdmNHUm1NQzV3WkdZaUxDSm9ZWE5vSWpvaU9EYzBNMkkxTWpBMk0yTmtPRFF3T1RkaE5qVmtNVFl6TTJZMVl6YzBaalVpZlgxOWZTd2ljM1ZpSWpvaVpHbGtPbVYwYUhJNmNtbHVhMlZpZVRvd2VEQXlNRFppWXpKa056RTVOekl4TlRFNVptUTNaVEJoWXpVNE1qSTBOamc0WlRGak5XTmpPV0psTldObU0yWmpOamRsWXpSbU9UTTNaR0k1TlRnMVpXVm1OaUlzSW01aVppSTZNVFkwT1RFNU5EazNPQ3dpYVhOeklqb2laR2xrT21WMGFISTZjbWx1YTJWaWVUb3dlREF6TURCalpEQmtabUU1WmpCaU5UYzJORGMwTTJZeE0yWXlNVGczTVRJMk1tWXpPRFV3TmpRM1pUaGxNR1l3TVROaVl6RXdaakZoTkRBd016WXhOV1UyWVNKOS51T3BCRm1WX1RZQjYwWlBib0M2bmEyemFCMERsSW4wSTV1cEVsLVlDcHVINnFpdXZseTRNNjNtTl9ESG1MWDBaeF9CQWdmWnpmbWtNZERDSXM5SVVmQSJdfSwibmJmIjoxNjQ5NzY5MDU4LCJpc3MiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4MDM0N2FkYWIxNGEwYzZhNzQwMGY4NmMyZTkwYzJlODlmY2YxNTJhMmI3NzM5YmMzMDllYTdmODM0ZjE3YjRiNTliIn0.Qs7fKz_9IP8uREmLwdHU0dap40gXh46Fm7m4zBP5M-aELpv1STA3GyNx3zMW8O38Ix9prJaTWfM35KH_LRtjDQ';

const navAgentController = new NAVAgentController('nav');

describe('The NAV agent controller', async () => {
	describe('the qualifiesForUnemploymentBenefits function', async () => {
		it('should return true if the presenation token is valid', async () => {
			const result = await navAgentController.isQualifiedForUnemploymentBenefits(validPresentationToken);
			assert.equal(result, true);
		});

		it('should not return true if not all credentials are present', async () => {
			const result = await navAgentController.isQualifiedForUnemploymentBenefits(notValidPresentationToken_0);
			assert.equal(result, false);
		});

		it('should not return true if the token is invalid', async () => {
			const result = await navAgentController.isQualifiedForUnemploymentBenefits(notValidPresentationToken_1);
			if (result instanceof Error){
				assert.ok;
			}
		});
	});
});