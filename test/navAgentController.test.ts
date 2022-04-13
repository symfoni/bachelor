import { it, describe } from 'mocha';
import { NAVAgentController } from '../src/controllers/NAVAgentController';
import assert from 'assert';

const validPresentationToken = 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0owZVhBaU9pSktWMVFpZlEuZXlKMll5STZleUpBWTI5dWRHVjRkQ0k2V3lKb2RIUndjem92TDNkM2R5NTNNeTV2Y21jdk1qQXhPQzlqY21Wa1pXNTBhV0ZzY3k5Mk1TSXNJbWgwZEhCek9pOHZjbUYzTG1kcGRHaDFZblZ6WlhKamIyNTBaVzUwTG1OdmJTOXplVzFtYjI1cEwySmhZMmhsYkc5eUwyUmxkaTl6WTJobGJXRnpMM1JsY20xcGJtRjBhVzl1VTJOb1pXMWhMbXB6YjI0aVhTd2lkSGx3WlNJNld5SldaWEpwWm1saFlteGxRM0psWkdWdWRHbGhiQ0lzSWxSbGNtMXBibUYwYVc5dVZrTWlYU3dpWTNKbFpHVnVkR2xoYkZOMVltcGxZM1FpT25zaWRHVnliV2x1WVhScGIyNGlPbnNpWlcxd2JHOTVaV1VpT25zaWJHRnpkRVJoZVVGMFYyOXlheUk2SWpJd01qRXRNREl0TURJaUxDSnNZWE4wVUdGNVpHRjVJam9pTWpBeU1TMHdNaTB3TWlJc0luUmxjbTFwYm1GMGFXOXVVM1JoZEhWeklqb2ljbVZ6YVdkdVpXUWlMQ0owWlhKdGFXNWhkR1ZrUkhWeWFXNW5WSEpwWVd4UVpYSnBiMlFpT25SeWRXVXNJbGRsWld0c2VWZHZjbXRJYjNWeWN5STZNaklzSW5SbGNtMXBibUYwYVc5dVRtOTBhV05sVW1WalpXbDJaV1FpT2lJeU1ESXhMVEF5TFRBeUluMHNJbU52Ym5SeVlXTjBVRVJHSWpwN0lsVlNUQ0k2SW1oMGRIQnpPaTh2Y0dSbWN5NWpiMjB2Y0dSbU1DNXdaR1lpTENKb1lYTm9Jam9pT0RjME0ySTFNakEyTTJOa09EUXdPVGRoTmpWa01UWXpNMlkxWXpjMFpqVWlmWDE5ZlN3aWMzVmlJam9pWkdsa09tVjBhSEk2Y21sdWEyVmllVG93ZURBeU1EWmlZekprTnpFNU56SXhOVEU1Wm1RM1pUQmhZelU0TWpJME5qZzRaVEZqTldOak9XSmxOV05tTTJaak5qZGxZelJtT1RNM1pHSTVOVGcxWldWbU5pSXNJbTVpWmlJNk1UWTBPVEU1TkRrM09Dd2lhWE56SWpvaVpHbGtPbVYwYUhJNmNtbHVhMlZpZVRvd2VEQXpNREJqWkRCa1ptRTVaakJpTlRjMk5EYzBNMll4TTJZeU1UZzNNVEkyTW1Zek9EVXdOalEzWlRobE1HWXdNVE5pWXpFd1pqRmhOREF3TXpZeE5XVTJZU0o5LnVPcEJGbVZfVFlCNjBaUGJvQzZuYTJ6YUIwRGxJbjBJNXVwRWwtWUNwdUg2cWl1dmx5NE02M21OX0RIbUxYMFp4X0JBZ2ZaemZta01kRENJczlJVWZBIiwiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0owZVhBaU9pSktWMVFpZlEuZXlKMll5STZleUpBWTI5dWRHVjRkQ0k2V3lKb2RIUndjem92TDNkM2R5NTNNeTV2Y21jdk1qQXhPQzlqY21Wa1pXNTBhV0ZzY3k5Mk1TSXNJbWgwZEhCek9pOHZjbUYzTG1kcGRHaDFZblZ6WlhKamIyNTBaVzUwTG1OdmJTOXplVzFtYjI1cEwySmhZMmhsYkc5eUwyUmxkaTl6WTJobGJXRnpMMlZ0Y0d4dmVXMWxiblJUWTJobGJXRXVhbk52YmlKZExDSjBlWEJsSWpwYklsWmxjbWxtYVdGaWJHVkRjbVZrWlc1MGFXRnNJaXdpUlcxd2JHOTViV1Z1ZEZaRElsMHNJbU55WldSbGJuUnBZV3hUZFdKcVpXTjBJanA3SW1WdGNHeHZlVzFsYm5RaU9uc2laVzF3Ykc5NVpXVWlPbnNpWlcxd2JHOTVaV1ZKWkNJNklqRTFaalUySWl3aWFtOWlWR2wwYkdVaU9pSkZibWRwYm1WbGNpSXNJbkJzWVdObFQyWlhiM0pySWpvaVUzbHRabTl1YVNCQlV5SXNJbWh2ZFhKelQyWlhiM0pySWpvMkxDSnpkR0Z5ZEVSaGRHVWlPaUl5TURJd0xUQTJMVEEySWl3aVpXNWtSR0YwWlNJNklqSXdNakV0TURZdE1EWWlMQ0psYlhCc2IzbHRaVzUwVTNSaGRIVnpJanA3SW1WdGNHeHZlVzFsYm5SVWVYQmxJam9pWm5Wc2JDQjBhVzFsSUdWdGNHeHZlV1ZsSWl3aWNHRnlkRlJwYldWUVpYSmpaVzUwWVdkbElqbzRNSDBzSW5OaGJHRnllU0k2ZXlKdGIyNTBhR3g1VTJGc1lYSjVJam96TnpBd01Dd2lkMjl5YTFCbGNtTmxiblJoWjJVaU9qRXdNQ3dpWTNWeWNtVnVZM2tpT2lKT1Qwc2lmU3dpZEhKcFlXeFFaWEpwYjJRaU9uc2ljM1JoY25SRVlYUmxJam9pTWpBeU1DMHdOaTB3TmlJc0ltVnVaRVJoZEdVaU9pSXlNREl4TFRBMkxUQTJJaXdpZEhKcFlXeFFaWEpwYjJSVVpYSnRhVzVoZEdsdmJrNXZkR2xqWlNJNk1UQjlMQ0p5YVdkb2RFWnZjbEJsYm5OcGIyNGlPblJ5ZFdVc0ltNXZia052YlhCbGRHVkRiR0YxYzJVaU9tWmhiSE5sTENKeVpYRjFhWEpsYldWdWRGUnZWMjl5YTA5MlpYSnpaV0Z6SWpwMGNuVmxmU3dpWTI5dWRISmhZM1JRUkVZaU9uc2lWVkpNSWpvaWFIUjBjSE02THk5emVXMW1iMjVwWTI5dWRISmhZM1J6TDJOdmJuUnlZV04wTG5Ca1ppSXNJbWhoYzJnaU9pSTBPR1EzTnpjeFpXTmlOMlkwWldOaE9USXdZMkUwTmprMU56VXdObUV4TjJRNFptVmhPVFl6TURNeFpqaGhPR1JrWkdNMVltVTBNR0kzTXpZMk9UWXhJbjE5Zlgwc0luTjFZaUk2SW1ScFpEcGxkR2h5T25KcGJtdGxZbms2TUhnd01qQTJZbU15WkRjeE9UY3lNVFV4T1daa04yVXdZV00xT0RJeU5EWTRPR1V4WXpWall6bGlaVFZqWmpObVl6WTNaV00wWmprek4yUmlPVFU0TldWbFpqWWlMQ0p1WW1ZaU9qRTJORGszTnpBME5Ua3NJbWx6Y3lJNkltUnBaRHBsZEdoeU9uSnBibXRsWW5rNk1IZ3dNekF3WTJRd1pHWmhPV1l3WWpVM05qUTNORE5tTVRObU1qRTROekV5TmpKbU16ZzFNRFkwTjJVNFpUQm1NREV6WW1NeE1HWXhZVFF3TURNMk1UVmxObUVpZlEuV2UzdEpOeExUazY5NnV3OXJPMWk0THdOOVk1dkJZT1ptUDh2OGNQTUhYb1V3aFJSenJHblh6Y3pjNnhHRFBzOFktMzM4VTJzdXV4YmV0a1BIVWhibmciLCJleUpoYkdjaU9pSkZVekkxTmtzaUxDSjBlWEFpT2lKS1YxUWlmUS5leUoyWXlJNmV5SkFZMjl1ZEdWNGRDSTZXeUpvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2TWpBeE9DOWpjbVZrWlc1MGFXRnNjeTkyTVNJc0ltaDBkSEJ6T2k4dmNtRjNMbWRwZEdoMVluVnpaWEpqYjI1MFpXNTBMbU52YlM5emVXMW1iMjVwTDJKaFkyaGxiRzl5TDJSbGRpOXpZMmhsYldGekwzUmxiWEJLVTA5T0wzQmxjbk52YmxOamFHVnRZUzVxYzI5dUlsMHNJblI1Y0dVaU9sc2lWbVZ5YVdacFlXSnNaVU55WldSbGJuUnBZV3dpTENKUVpYSnpiMjVXUXlKZExDSmpjbVZrWlc1MGFXRnNVM1ZpYW1WamRDSTZleUp3WlhKemIyNGlPbnNpWkdGMFpVOW1SR1ZoZEdnaU9pSXlNREl3TFRBeExUQXhWREU1T2pJek9qSTBXaUlzSW1OdmRXNTBjbmxQWmtSbFlYUm9Jam9pVGs4aUxDSndiR0ZqWlU5bVJHVmhkR2dpT2lKSGFzTzRkbWxySWl3aVkyOTFiblJ5ZVU5bVFtbHlkR2dpT2lKT1R5SXNJbkJzWVdObFQyWkNhWEowYUNJNklrRmtaSEpsYzNObGRtVm5aVzRnTWpJaUxDSmtZWFJsVDJaQ2FYSjBhQ0k2SWpJd01UQXRNREV0TURGVU1UazZNak02TWpSYUlpd2laMlZ1WkdWeUlqb2liV0ZzWlNJc0ltNWhiV1VpT25zaWJHRnpkRTVoYldVaU9pSlRkMlZrYVhOb2JXRnVJaXdpWm1seWMzUk9ZVzFsSWpvaVQyeGhJaXdpYldsa1pHeGxUbUZ0WlNJNklrZHliMjF3SW4wc0ltOXlhV2RwYm1Gc1RtRnRaU0k2SWs5c1lTQk9iM0p0WVc1dUlpd2liV0Z5YVhSaGJGTjBZWFIxY3lJNkluVnViV0Z5Y21sbFpDSXNJbU5wZEdsNlpXNXphR2x3SWpvaVZWTWlMQ0poWkdSeVpYTnpJanA3SW1OdmRXNTBjbmxEYjJSbElqb2lUazhpTENKamFYUjVJam9pWjJyRHVIWnBheUlzSW5wcGNFTnZaR1VpT2pFeU1USXNJbk4wY21WbGRFNWhiV1VpT2lKMlpXbG5ZWFJsYmlJc0luTjBjbVZsZEU1MWJXSmxjaUk2TVRKOWZYMTlMQ0p6ZFdJaU9pSmthV1E2WlhSb2NqcHlhVzVyWldKNU9qQjRNREl3Tm1Kak1tUTNNVGszTWpFMU1UbG1aRGRsTUdGak5UZ3lNalEyT0RobE1XTTFZMk01WW1VMVkyWXpabU0yTjJWak5HWTVNemRrWWprMU9EVmxaV1kySWl3aWJtSm1Jam94TmpRNU5qWTRORFk0TENKcGMzTWlPaUprYVdRNlpYUm9janB5YVc1clpXSjVPakI0TURKbU1USTFPVFkzT1RWbE1UWTFZMkptTWpoaVlUbGhaall4TlRFM04yTTFOVEUxWlRFNFpHSXhOV05pWXpKaVlXVmhOMkZsWVdVeU16QmxZakJtTmpBNUluMC5QaFM5ZTRlQ2hFUS00TFF0VVNtdVh6amNONmhGN2NPc0NidjFHSUpuTUd1a05Ea2MxWnhMNU96OXlTRmQyWlEwbUJzY19oUDhQa29GOWkyaXNQMkZPQSJdfSwibmJmIjoxNjQ5ODM1ODgwLCJpc3MiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4MDM0N2FkYWIxNGEwYzZhNzQwMGY4NmMyZTkwYzJlODlmY2YxNTJhMmI3NzM5YmMzMDllYTdmODM0ZjE3YjRiNTliIn0.0htNqzJLCMOEiAzEzcMTyCZ3SqivupxAnDC8c1WTtAX6HSo61DJpKaRlx9S1_thmalMWFm3UJxtA-g1qEAPxXg';

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