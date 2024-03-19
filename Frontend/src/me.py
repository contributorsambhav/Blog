class Solution(object):
    def romanToInt(self, s):
        if not s:
            return 0

        roman_values = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
        ret = 0
        
        for i in range(len(s)):
            if s[i] in roman_values:
                value = roman_values[s[i]]
                if i + 1 < len(s) and roman_values[s[i + 1]] > value:
                    ret -= value
                else:
                    ret += value
            else:
                return 0  
        
        return ret
