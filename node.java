import java.util.LinkedList<E>;
import java.util.Scanner;
public class node {
  private Node firstNode;
  private Node lastNode;
}

private class testing {
  LinkedList myList = new LinkedList();
  ArrayList<Pill> list = new ArrayList<Pill>();

  Scanner console = new Scanner(new File("pills.txt"));

  while(console.hasNextLine()) {
    String pillType = console.nextLine();
    list.add(pillType);
  }
  for(i = 0; i < list.size(); i++) {
    myList.add(list.get(i));
    ListIterator myIt = new ListIterator(myList);
    myIt.next();
  }
  // Edit this line
  if(myList.contains(x /* x is an object s.t. x is an image */) == false) {
    // take the picture again.....
    
  }
}
