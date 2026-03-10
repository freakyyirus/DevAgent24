import { Challenge } from '@/types';

export const CHALLENGES: Challenge[] = [
  {
    id: 'ch-001',
    title: 'Two Sum',
    difficulty: 'easy',
    category: 'Data Structures & Algorithms',
    description:
      'Given an array of integers `nums` and an integer `target`, return indices of the two numbers that add up to `target`. You may assume each input has exactly one solution, and you may not use the same element twice.',
    estimated_minutes: 15,
    skills_tested: ['arrays', 'hash-maps', 'problem-solving'],
    hints: [
      "Think about using a hash map to store numbers you've seen.",
      'For each number, check if `target - num` exists in the hash map.',
      'You can solve this in O(n) time complexity.',
    ],
    initial_tests: {
      python: `_run_test("basic pair", lambda: assert two_sum([2, 7, 11, 15], 9) == [0, 1])
_run_test("negative numbers", lambda: assert two_sum([-1, -2, -3, -4, -5], -8) == [2, 4])
_run_test("large numbers", lambda: assert two_sum([1000000, 500000, 500000], 1000000) == [1, 2])
_run_test("first and last", lambda: assert two_sum([3, 2, 4], 6) == [1, 2])
_run_test("single pair", lambda: assert two_sum([3, 3], 6) == [0, 1])`,
      javascript: `test("basic pair", () => expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]));
test("negative numbers", () => expect(twoSum([-1, -2, -3, -4, -5], -8)).toEqual([2, 4]));
test("large numbers", () => expect(twoSum([1000000, 500000, 500000], 1000000)).toEqual([1, 2]));`,
      typescript: `test("basic pair", () => expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]));`,
      go: `func TestTwoSum(t *testing.T) {
  result := twoSum([]int{2, 7, 11, 15}, 9)
  if result[0] != 0 || result[1] != 1 { t.Errorf("Expected [0,1], got %v", result) }
}`,
      java: `@Test public void testBasic() { assertArrayEquals(new int[]{0,1}, twoSum(new int[]{2,7,11,15}, 9)); }`,
      cpp: `assert(twoSum({2,7,11,15}, 9) == vector<int>{0,1});`,
      rust: `assert_eq!(two_sum(vec![2,7,11,15], 9), vec![0,1]);`,
      ruby: `assert_equal [0,1], two_sum([2,7,11,15], 9)`,
    },
    solution_template: {
      python: `def two_sum(nums, target):
    # Write your solution here
    pass`,
      javascript: `function twoSum(nums, target) {
  // Write your solution here
}`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
  // Write your solution here
  return [];
}`,
      go: `func twoSum(nums []int, target int) []int {
    // Write your solution here
    return nil
}`,
      java: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
      cpp: `#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    return {};
}`,
      rust: `fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    // Write your solution here
    vec![]
}`,
      ruby: `def two_sum(nums, target)
  # Write your solution here
end`,
    },
  },
  {
    id: 'ch-002',
    title: 'Valid Parentheses',
    difficulty: 'easy',
    category: 'Data Structures & Algorithms',
    description:
      'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. An input string is valid if: open brackets are closed by the same type, and in the correct order.',
    estimated_minutes: 15,
    skills_tested: ['stacks', 'strings', 'data-structures'],
    hints: [
      'Use a stack to track opening brackets.',
      'When you see a closing bracket, check if the top of the stack matches.',
      'The string is valid if the stack is empty at the end.',
    ],
    initial_tests: {
      python: `_run_test("simple parens", lambda: assert is_valid("()") == True)
_run_test("mixed valid", lambda: assert is_valid("()[]{}") == True)
_run_test("invalid", lambda: assert is_valid("(]") == False)
_run_test("nested", lambda: assert is_valid("{[]}") == True)
_run_test("empty", lambda: assert is_valid("") == True)`,
      javascript: `test("simple", () => expect(isValid("()")).toBe(true));
test("mixed", () => expect(isValid("()[]{}")).toBe(true));
test("invalid", () => expect(isValid("(]")).toBe(false));`,
      typescript: `test("simple", () => expect(isValid("()")).toBe(true));`,
      go: `func TestIsValid(t *testing.T) { if !isValid("()") { t.Error("Expected true") } }`,
      java: `@Test public void testSimple() { assertTrue(isValid("()")); }`,
      cpp: `assert(isValid("()") == true);`,
      rust: `assert_eq!(is_valid(String::from("()")), true);`,
      ruby: `assert_equal true, is_valid("()")`,
    },
    solution_template: {
      python: `def is_valid(s):
    # Write your solution here
    pass`,
      javascript: `function isValid(s) {
  // Write your solution here
}`,
      typescript: `function isValid(s: string): boolean {
  // Write your solution here
  return false;
}`,
      go: `func isValid(s string) bool {
    // Write your solution here
    return false
}`,
      java: `public class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        return false;
    }
}`,
      cpp: `bool isValid(string s) {
    // Write your solution here
    return false;
}`,
      rust: `fn is_valid(s: String) -> bool {
    // Write your solution here
    false
}`,
      ruby: `def is_valid(s)
  # Write your solution here
end`,
    },
  },
  {
    id: 'ch-003',
    title: 'Reverse Linked List',
    difficulty: 'easy',
    category: 'Data Structures & Algorithms',
    description:
      'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    estimated_minutes: 20,
    skills_tested: ['linked-lists', 'pointers', 'recursion'],
    hints: [
      'Use three pointers: prev, current, and next.',
      'Iteratively reverse the links.',
      'Can also be solved recursively.',
    ],
    initial_tests: {
      python: `_run_test("basic", lambda: assert list_to_array(reverse_list(array_to_list([1,2,3,4,5]))) == [5,4,3,2,1])
_run_test("two elements", lambda: assert list_to_array(reverse_list(array_to_list([1,2]))) == [2,1])
_run_test("single", lambda: assert list_to_array(reverse_list(array_to_list([1]))) == [1])`,
      javascript: `test("basic", () => expect(reverseList([1,2,3,4,5])).toEqual([5,4,3,2,1]));`,
      typescript: `test("basic", () => expect(reverseList([1,2,3,4,5])).toEqual([5,4,3,2,1]));`,
      go: `func TestReverse(t *testing.T) {}`,
      java: `@Test public void testBasic() {}`,
      cpp: `// Tests for reverse linked list`,
      rust: `// Tests for reverse linked list`,
      ruby: `# Tests for reverse linked list`,
    },
    solution_template: {
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    # Write your solution here
    pass

# Helper functions
def array_to_list(arr):
    if not arr: return None
    head = ListNode(arr[0])
    curr = head
    for v in arr[1:]:
        curr.next = ListNode(v)
        curr = curr.next
    return head

def list_to_array(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result`,
      javascript: `function reverseList(arr) {
  // Write your solution here
}`,
      typescript: `function reverseList(arr: number[]): number[] {
  return [];
}`,
      go: `func reverseList(head *ListNode) *ListNode { return nil }`,
      java: `public ListNode reverseList(ListNode head) { return null; }`,
      cpp: `ListNode* reverseList(ListNode* head) { return nullptr; }`,
      rust: `fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> { None }`,
      ruby: `def reverse_list(head) nil end`,
    },
  },
  {
    id: 'ch-004',
    title: 'Binary Search',
    difficulty: 'easy',
    category: 'Data Structures & Algorithms',
    description:
      'Given a sorted array of integers `nums` and a target value, return the index if found. If not, return -1. You must write an algorithm with O(log n) runtime complexity.',
    estimated_minutes: 10,
    skills_tested: ['binary-search', 'algorithms', 'arrays'],
    hints: [
      'Use two pointers: left and right.',
      'Compare the middle element with the target.',
      'Adjust the bounds based on comparison.',
    ],
    initial_tests: {
      python: `_run_test("found", lambda: assert binary_search([-1,0,3,5,9,12], 9) == 4)
_run_test("not found", lambda: assert binary_search([-1,0,3,5,9,12], 2) == -1)
_run_test("single found", lambda: assert binary_search([5], 5) == 0)
_run_test("single not found", lambda: assert binary_search([5], 1) == -1)`,
      javascript: `test("found", () => expect(binarySearch([-1,0,3,5,9,12], 9)).toBe(4));
test("not found", () => expect(binarySearch([-1,0,3,5,9,12], 2)).toBe(-1));`,
      typescript: `test("found", () => expect(binarySearch([-1,0,3,5,9,12], 9)).toBe(4));`,
      go: `func TestBinarySearch(t *testing.T) {}`,
      java: `@Test public void testFound() { assertEquals(4, binarySearch(new int[]{-1,0,3,5,9,12}, 9)); }`,
      cpp: `assert(binarySearch({-1,0,3,5,9,12}, 9) == 4);`,
      rust: `assert_eq!(binary_search(&vec![-1,0,3,5,9,12], 9), 4);`,
      ruby: `assert_equal 4, binary_search([-1,0,3,5,9,12], 9)`,
    },
    solution_template: {
      python: `def binary_search(nums, target):
    # Write your solution here
    pass`,
      javascript: `function binarySearch(nums, target) {
  // Write your solution here
}`,
      typescript: `function binarySearch(nums: number[], target: number): number {
  return -1;
}`,
      go: `func binarySearch(nums []int, target int) int { return -1 }`,
      java: `public int binarySearch(int[] nums, int target) { return -1; }`,
      cpp: `int binarySearch(vector<int>& nums, int target) { return -1; }`,
      rust: `fn binary_search(nums: &Vec<i32>, target: i32) -> i32 { -1 }`,
      ruby: `def binary_search(nums, target) -1 end`,
    },
  },
  {
    id: 'ch-005',
    title: 'Merge Two Sorted Lists',
    difficulty: 'easy',
    category: 'Data Structures & Algorithms',
    description:
      'Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.',
    estimated_minutes: 20,
    skills_tested: ['linked-lists', 'merging', 'recursion'],
    hints: [
      'Use a dummy head node to simplify the merge.',
      'Compare the heads of both lists and append the smaller one.',
      'Don\'t forget to handle when one list is exhausted.',
    ],
    initial_tests: {
      python: `_run_test("basic merge", lambda: assert merge_sorted([1,2,4], [1,3,4]) == [1,1,2,3,4,4])
_run_test("empty list", lambda: assert merge_sorted([], [0]) == [0])
_run_test("both empty", lambda: assert merge_sorted([], []) == [])`,
      javascript: `test("basic", () => expect(mergeSorted([1,2,4], [1,3,4])).toEqual([1,1,2,3,4,4]));`,
      typescript: `test("basic", () => expect(mergeSorted([1,2,4], [1,3,4])).toEqual([1,1,2,3,4,4]));`,
      go: `func TestMergeSorted(t *testing.T) {}`,
      java: `@Test public void testMerge() {}`,
      cpp: `// merge sorted lists test`,
      rust: `// merge sorted lists test`,
      ruby: `# merge sorted lists test`,
    },
    solution_template: {
      python: `def merge_sorted(list1, list2):
    # Write your solution here
    pass`,
      javascript: `function mergeSorted(list1, list2) {
  // Write your solution here
}`,
      typescript: `function mergeSorted(list1: number[], list2: number[]): number[] {
  return [];
}`,
      go: `func mergeSorted(l1, l2 []int) []int { return nil }`,
      java: `public List<Integer> mergeSorted(List<Integer> l1, List<Integer> l2) { return new ArrayList<>(); }`,
      cpp: `vector<int> mergeSorted(vector<int>& l1, vector<int>& l2) { return {}; }`,
      rust: `fn merge_sorted(l1: Vec<i32>, l2: Vec<i32>) -> Vec<i32> { vec![] }`,
      ruby: `def merge_sorted(l1, l2) [] end`,
    },
  },
  {
    id: 'ch-006',
    title: 'Maximum Subarray',
    difficulty: 'medium',
    category: 'Data Structures & Algorithms',
    description:
      'Given an integer array `nums`, find the subarray with the largest sum, and return its sum. Use Kadane\'s Algorithm for O(n) solution.',
    estimated_minutes: 25,
    skills_tested: ['dynamic-programming', 'arrays', 'kadane-algorithm'],
    hints: [
      'Think about Kadane\'s Algorithm.',
      'At each position, decide: extend the subarray or start fresh.',
      'Track both the current sum and the global maximum.',
    ],
    initial_tests: {
      python: `_run_test("mixed", lambda: assert max_subarray([-2,1,-3,4,-1,2,1,-5,4]) == 6)
_run_test("single", lambda: assert max_subarray([1]) == 1)
_run_test("all negative", lambda: assert max_subarray([-1,-2,-3]) == -1)
_run_test("all positive", lambda: assert max_subarray([5,4,3]) == 12)`,
      javascript: `test("mixed", () => expect(maxSubarray([-2,1,-3,4,-1,2,1,-5,4])).toBe(6));`,
      typescript: `test("mixed", () => expect(maxSubarray([-2,1,-3,4,-1,2,1,-5,4])).toBe(6));`,
      go: `func TestMaxSubarray(t *testing.T) {}`,
      java: `@Test public void testMixed() { assertEquals(6, maxSubarray(new int[]{-2,1,-3,4,-1,2,1,-5,4})); }`,
      cpp: `assert(maxSubarray({-2,1,-3,4,-1,2,1,-5,4}) == 6);`,
      rust: `assert_eq!(max_subarray(vec![-2,1,-3,4,-1,2,1,-5,4]), 6);`,
      ruby: `assert_equal 6, max_subarray([-2,1,-3,4,-1,2,1,-5,4])`,
    },
    solution_template: {
      python: `def max_subarray(nums):
    # Write your solution here
    pass`,
      javascript: `function maxSubarray(nums) {
  // Write your solution here
}`,
      typescript: `function maxSubarray(nums: number[]): number {
  return 0;
}`,
      go: `func maxSubarray(nums []int) int { return 0 }`,
      java: `public int maxSubarray(int[] nums) { return 0; }`,
      cpp: `int maxSubarray(vector<int>& nums) { return 0; }`,
      rust: `fn max_subarray(nums: Vec<i32>) -> i32 { 0 }`,
      ruby: `def max_subarray(nums) 0 end`,
    },
  },
  {
    id: 'ch-007',
    title: 'LRU Cache',
    difficulty: 'medium',
    category: 'System Design',
    description:
      'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement `get` and `put` operations in O(1) time.',
    estimated_minutes: 35,
    skills_tested: ['hash-maps', 'linked-lists', 'system-design', 'caching'],
    hints: [
      'Use a hash map + doubly linked list combination.',
      'The hash map gives O(1) access, the linked list maintains order.',
      'Move accessed items to the front of the list.',
    ],
    initial_tests: {
      python: `_run_test("basic ops", lambda: (
    cache := LRUCache(2),
    cache.put(1, 1),
    cache.put(2, 2),
    assert cache.get(1) == 1,
    cache.put(3, 3),
    assert cache.get(2) == -1,
))`,
      javascript: `test("basic", () => { const c = new LRUCache(2); c.put(1,1); c.put(2,2); expect(c.get(1)).toBe(1); });`,
      typescript: `test("basic", () => { const c = new LRUCache(2); c.put(1,1); expect(c.get(1)).toBe(1); });`,
      go: `func TestLRUCache(t *testing.T) {}`,
      java: `@Test public void testLRU() {}`,
      cpp: `// LRU Cache tests`,
      rust: `// LRU Cache tests`,
      ruby: `# LRU Cache tests`,
    },
    solution_template: {
      python: `class LRUCache:
    def __init__(self, capacity):
        # Initialize your data structure here
        pass
    
    def get(self, key):
        # Return the value or -1 if not found
        pass
    
    def put(self, key, value):
        # Insert or update the value
        pass`,
      javascript: `class LRUCache {
  constructor(capacity) {
    // Initialize your data structure here
  }
  get(key) { return -1; }
  put(key, value) {}
}`,
      typescript: `class LRUCache {
  constructor(private capacity: number) {}
  get(key: number): number { return -1; }
  put(key: number, value: number): void {}
}`,
      go: `type LRUCache struct{}
func Constructor(capacity int) LRUCache { return LRUCache{} }
func (c *LRUCache) Get(key int) int { return -1 }
func (c *LRUCache) Put(key int, value int) {}`,
      java: `class LRUCache {
    public LRUCache(int capacity) {}
    public int get(int key) { return -1; }
    public void put(int key, int value) {}
}`,
      cpp: `class LRUCache {
public:
    LRUCache(int capacity) {}
    int get(int key) { return -1; }
    void put(int key, int value) {}
};`,
      rust: `struct LRUCache {}
impl LRUCache {
    fn new(capacity: i32) -> Self { LRUCache {} }
    fn get(&mut self, key: i32) -> i32 { -1 }
    fn put(&mut self, key: i32, value: i32) {}
}`,
      ruby: `class LRUCache
  def initialize(capacity) end
  def get(key) -1 end
  def put(key, value) end
end`,
    },
  },
  {
    id: 'ch-008',
    title: 'Number of Islands',
    difficulty: 'medium',
    category: 'Data Structures & Algorithms',
    description:
      'Given a 2D grid of "1"s (land) and "0"s (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    estimated_minutes: 30,
    skills_tested: ['graphs', 'bfs', 'dfs', 'matrices'],
    hints: [
      'Use DFS or BFS to explore each island.',
      'Mark visited cells to avoid counting them twice.',
      'Each new unvisited "1" starts a new island.',
    ],
    initial_tests: {
      python: `_run_test("basic", lambda: assert num_islands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]) == 1)
_run_test("multiple", lambda: assert num_islands([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]) == 3)`,
      javascript: `test("basic", () => expect(numIslands([["1","1","1"],["0","1","0"],["1","1","1"]])).toBe(1));`,
      typescript: `test("basic", () => expect(numIslands([["1","1"],["1","1"]])).toBe(1));`,
      go: `func TestNumIslands(t *testing.T) {}`,
      java: `@Test public void testBasic() {}`,
      cpp: `// num islands tests`,
      rust: `// num islands tests`,
      ruby: `# num islands tests`,
    },
    solution_template: {
      python: `def num_islands(grid):
    # Write your solution here
    pass`,
      javascript: `function numIslands(grid) {
  // Write your solution here
}`,
      typescript: `function numIslands(grid: string[][]): number {
  return 0;
}`,
      go: `func numIslands(grid [][]byte) int { return 0 }`,
      java: `public int numIslands(char[][] grid) { return 0; }`,
      cpp: `int numIslands(vector<vector<char>>& grid) { return 0; }`,
      rust: `fn num_islands(grid: Vec<Vec<char>>) -> i32 { 0 }`,
      ruby: `def num_islands(grid) 0 end`,
    },
  },
  {
    id: 'ch-009',
    title: 'Longest Palindromic Substring',
    difficulty: 'medium',
    category: 'Data Structures & Algorithms',
    description:
      'Given a string `s`, return the longest palindromic substring in `s`.',
    estimated_minutes: 30,
    skills_tested: ['strings', 'dynamic-programming', 'two-pointers'],
    hints: [
      'Expand around center for each character.',
      'Consider both odd and even length palindromes.',
      'Manacher\'s algorithm gives O(n) but expand-around-center is O(n²) and simpler.',
    ],
    initial_tests: {
      python: `_run_test("basic", lambda: assert longest_palindrome("babad") in ["bab", "aba"])
_run_test("even", lambda: assert longest_palindrome("cbbd") == "bb")
_run_test("single", lambda: assert longest_palindrome("a") == "a")`,
      javascript: `test("basic", () => expect(["bab","aba"]).toContain(longestPalindrome("babad")));`,
      typescript: `test("basic", () => expect(["bab","aba"]).toContain(longestPalindrome("babad")));`,
      go: `func TestLongestPalindrome(t *testing.T) {}`,
      java: `@Test public void testBasic() {}`,
      cpp: `// longest palindrome tests`,
      rust: `// longest palindrome tests`,
      ruby: `# longest palindrome tests`,
    },
    solution_template: {
      python: `def longest_palindrome(s):
    # Write your solution here
    pass`,
      javascript: `function longestPalindrome(s) {
  // Write your solution here
}`,
      typescript: `function longestPalindrome(s: string): string {
  return "";
}`,
      go: `func longestPalindrome(s string) string { return "" }`,
      java: `public String longestPalindrome(String s) { return ""; }`,
      cpp: `string longestPalindrome(string s) { return ""; }`,
      rust: `fn longest_palindrome(s: String) -> String { String::new() }`,
      ruby: `def longest_palindrome(s) "" end`,
    },
  },
  {
    id: 'ch-010',
    title: 'Word Search',
    difficulty: 'hard',
    category: 'Data Structures & Algorithms',
    description:
      'Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells.',
    estimated_minutes: 40,
    skills_tested: ['backtracking', 'dfs', 'matrices', 'recursion'],
    hints: [
      'Use DFS with backtracking from each cell.',
      'Mark cells as visited during exploration.',
      'Make sure to unmark cells when backtracking.',
    ],
    initial_tests: {
      python: `_run_test("found", lambda: assert word_search([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED") == True)
_run_test("not found", lambda: assert word_search([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB") == False)`,
      javascript: `test("found", () => expect(wordSearch([["A","B"],["C","D"]], "ABDC")).toBe(true));`,
      typescript: `test("found", () => expect(wordSearch([["A","B"],["C","D"]], "ABDC")).toBe(true));`,
      go: `func TestWordSearch(t *testing.T) {}`,
      java: `@Test public void testFound() {}`,
      cpp: `// word search tests`,
      rust: `// word search tests`,
      ruby: `# word search tests`,
    },
    solution_template: {
      python: `def word_search(board, word):
    # Write your solution here
    pass`,
      javascript: `function wordSearch(board, word) {
  // Write your solution here
}`,
      typescript: `function wordSearch(board: string[][], word: string): boolean {
  return false;
}`,
      go: `func wordSearch(board [][]byte, word string) bool { return false }`,
      java: `public boolean exist(char[][] board, String word) { return false; }`,
      cpp: `bool exist(vector<vector<char>>& board, string word) { return false; }`,
      rust: `fn word_search(board: Vec<Vec<char>>, word: String) -> bool { false }`,
      ruby: `def word_search(board, word) false end`,
    },
  },
  {
    id: 'ch-011',
    title: 'Design URL Shortener',
    difficulty: 'hard',
    category: 'System Design',
    description:
      'Design a URL shortening service like TinyURL. Implement encode and decode methods.',
    estimated_minutes: 45,
    skills_tested: ['system-design', 'hash-maps', 'base62-encoding'],
    hints: [
      'Use a hash map for bidirectional lookup.',
      'Generate short codes using base62 encoding.',
      'Consider collision handling.',
    ],
    initial_tests: {
      python: `_run_test("encode decode", lambda: (
    codec := URLCodec(),
    short := codec.encode("https://devagent.xyz/dashboard"),
    assert codec.decode(short) == "https://devagent.xyz/dashboard",
))
_run_test("different urls", lambda: (
    codec := URLCodec(),
    s1 := codec.encode("https://a.com"),
    s2 := codec.encode("https://b.com"),
    assert s1 != s2,
))`,
      javascript: `test("encode/decode", () => { const c = new URLCodec(); const s = c.encode("https://example.com"); expect(c.decode(s)).toBe("https://example.com"); });`,
      typescript: `test("round trip", () => { const c = new URLCodec(); expect(c.decode(c.encode("https://x.com"))).toBe("https://x.com"); });`,
      go: `func TestURLCodec(t *testing.T) {}`,
      java: `@Test public void testCodec() {}`,
      cpp: `// URL codec tests`,
      rust: `// URL codec tests`,
      ruby: `# URL codec tests`,
    },
    solution_template: {
      python: `class URLCodec:
    def __init__(self):
        # Initialize your data structure here
        pass
    
    def encode(self, longUrl):
        # Encode a URL to a shortened URL
        pass
    
    def decode(self, shortUrl):
        # Decode a shortened URL to the original
        pass`,
      javascript: `class URLCodec {
  encode(longUrl) { return ""; }
  decode(shortUrl) { return ""; }
}`,
      typescript: `class URLCodec {
  encode(longUrl: string): string { return ""; }
  decode(shortUrl: string): string { return ""; }
}`,
      go: `type URLCodec struct{}
func (c *URLCodec) Encode(longUrl string) string { return "" }
func (c *URLCodec) Decode(shortUrl string) string { return "" }`,
      java: `class URLCodec {
    public String encode(String longUrl) { return ""; }
    public String decode(String shortUrl) { return ""; }
}`,
      cpp: `class URLCodec {
public:
    string encode(string longUrl) { return ""; }
    string decode(string shortUrl) { return ""; }
};`,
      rust: `struct URLCodec {}
impl URLCodec {
    fn encode(&mut self, long_url: String) -> String { String::new() }
    fn decode(&self, short_url: String) -> String { String::new() }
}`,
      ruby: `class URLCodec
  def encode(long_url) "" end
  def decode(short_url) "" end
end`,
    },
  },
  {
    id: 'ch-012',
    title: 'Fibonacci Dynamic Programming',
    difficulty: 'easy',
    category: 'Data Structures & Algorithms',
    description:
      'Calculate the nth Fibonacci number using dynamic programming. F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2).',
    estimated_minutes: 10,
    skills_tested: ['dynamic-programming', 'memoization', 'optimization'],
    hints: [
      'Start with the recursive solution, then optimize.',
      'Use bottom-up DP with O(1) space.',
      'Only track the last two values.',
    ],
    initial_tests: {
      python: `_run_test("zero", lambda: assert fibonacci(0) == 0)
_run_test("one", lambda: assert fibonacci(1) == 1)
_run_test("ten", lambda: assert fibonacci(10) == 55)
_run_test("twenty", lambda: assert fibonacci(20) == 6765)`,
      javascript: `test("ten", () => expect(fibonacci(10)).toBe(55));
test("twenty", () => expect(fibonacci(20)).toBe(6765));`,
      typescript: `test("ten", () => expect(fibonacci(10)).toBe(55));`,
      go: `func TestFibonacci(t *testing.T) { if fibonacci(10) != 55 { t.Error("wrong") } }`,
      java: `@Test public void testTen() { assertEquals(55, fibonacci(10)); }`,
      cpp: `assert(fibonacci(10) == 55);`,
      rust: `assert_eq!(fibonacci(10), 55);`,
      ruby: `assert_equal 55, fibonacci(10)`,
    },
    solution_template: {
      python: `def fibonacci(n):
    # Write your solution here
    pass`,
      javascript: `function fibonacci(n) {
  // Write your solution here
}`,
      typescript: `function fibonacci(n: number): number {
  return 0;
}`,
      go: `func fibonacci(n int) int { return 0 }`,
      java: `public int fibonacci(int n) { return 0; }`,
      cpp: `int fibonacci(int n) { return 0; }`,
      rust: `fn fibonacci(n: i32) -> i32 { 0 }`,
      ruby: `def fibonacci(n) 0 end`,
    },
  },
];

export function getChallengeById(id: string): Challenge | undefined {
  return CHALLENGES.find((c) => c.id === id);
}

export function getChallengesByDifficulty(difficulty: string): Challenge[] {
  return CHALLENGES.filter((c) => c.difficulty === difficulty);
}

export function getChallengesByCategory(category: string): Challenge[] {
  return CHALLENGES.filter((c) => c.category === category);
}
